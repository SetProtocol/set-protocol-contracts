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
          "indexed": true,
          "name": "_setTokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_factory",
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
          "name": "_factory",
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
  "bytecode": "0x608060405234801561001057600080fd5b5061072a806100206000396000f3006080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100e85780635290444914610112578063559ed339146101835780636e667db3146101e8578063a003e069146101fd578063c19d93fb14610218578063f7213db614610253578063fbfa77cf1461026b578063fe5b38e414610280578063fef3ee7314610295575b600080fd5b3480156100bf57600080fd5b506100d4600160a060020a03600435166102b6565b604080519115158252519081900360200190f35b3480156100f457600080fd5b506101006004356102d4565b60408051918252519081900360200190f35b34801561011e57600080fd5b5061016760048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a4359182019101356102e6565b60408051600160a060020a039092168252519081900360200190f35b34801561018f57600080fd5b506101986105b4565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d45781810151838201526020016101bc565b505050509050019250505060405180910390f35b3480156101f457600080fd5b50610167610619565b34801561020957600080fd5b5061016760ff60043516610628565b34801561022457600080fd5b5061022d610646565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561025f57600080fd5b5061010060043561065c565b34801561027757600080fd5b5061016761066e565b34801561028c57600080fd5b5061019861067d565b3480156102a157600080fd5b506100d4600160a060020a03600435166106e0565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b600160a060020a038a16600090815260036020526040812054819060ff16151561030f57600080fd5b8b600160a060020a031663110a25c28c8c8c8c8c8c8c8c8c6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b1580156103f757600080fd5b505af115801561040b573d6000803e3d6000fd5b505050506040513d602081101561042157600080fd5b8101908080519060200190929190505050905060016000600501600083600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018190806001815401808255809150509060018203906000526020600020016000909192909190916101000a815481600160a060020a030219169083600160a060020a031602179055505080600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88d8d8d8d8d8d8d8d8d8d604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a29b9a5050505050505050505050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561060f57602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116105f1575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561060f57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105f1575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a7230582073ef4acc3e9a9ec0c457698c241ef38a35e2f65f34e79112cefb1d53f3cb89a20029",
  "deployedBytecode": "0x6080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100e85780635290444914610112578063559ed339146101835780636e667db3146101e8578063a003e069146101fd578063c19d93fb14610218578063f7213db614610253578063fbfa77cf1461026b578063fe5b38e414610280578063fef3ee7314610295575b600080fd5b3480156100bf57600080fd5b506100d4600160a060020a03600435166102b6565b604080519115158252519081900360200190f35b3480156100f457600080fd5b506101006004356102d4565b60408051918252519081900360200190f35b34801561011e57600080fd5b5061016760048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a4359182019101356102e6565b60408051600160a060020a039092168252519081900360200190f35b34801561018f57600080fd5b506101986105b4565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d45781810151838201526020016101bc565b505050509050019250505060405180910390f35b3480156101f457600080fd5b50610167610619565b34801561020957600080fd5b5061016760ff60043516610628565b34801561022457600080fd5b5061022d610646565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561025f57600080fd5b5061010060043561065c565b34801561027757600080fd5b5061016761066e565b34801561028c57600080fd5b5061019861067d565b3480156102a157600080fd5b506100d4600160a060020a03600435166106e0565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b600160a060020a038a16600090815260036020526040812054819060ff16151561030f57600080fd5b8b600160a060020a031663110a25c28c8c8c8c8c8c8c8c8c6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b1580156103f757600080fd5b505af115801561040b573d6000803e3d6000fd5b505050506040513d602081101561042157600080fd5b8101908080519060200190929190505050905060016000600501600083600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018190806001815401808255809150509060018203906000526020600020016000909192909190916101000a815481600160a060020a030219169083600160a060020a031602179055505080600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88d8d8d8d8d8d8d8d8d8d604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a29b9a5050505050505050505050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561060f57602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116105f1575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561060f57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116105f1575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a7230582073ef4acc3e9a9ec0c457698c241ef38a35e2f65f34e79112cefb1d53f3cb89a20029",
  "sourceMap": "934:2067:5:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;934:2067:5;;;;;;;",
  "deployedSourceMap": "934:2067:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:16;-1:-1:-1;;;;;2803:164:16;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:16;;;;;;;;;;;;;;;;;;;;;1979:1020:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1979:1020:5;;;;-1:-1:-1;;;;;1979:1020:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1979:1020:5;;;;;;;;;;;;;;3685:119:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:16;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:16;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:16;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:16;;;;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;;;;;;;;;;;;;;;;;;;4008:160;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:16;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:16;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:16;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:16;-1:-1:-1;;;;;3409:146:16;;;;;2803:164;-1:-1:-1;;;;;2930:30:16;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;1979:1020:5:-;-1:-1:-1;;;;;2263:30:5;;2188:7;2263:30;;;:20;:30;;;;;;2188:7;;2263:30;;2255:39;;;;;;;;2372:8;-1:-1:-1;;;;;2360:28:5;;2402:11;;2427:6;;2447:12;2473:5;;2492:7;;2360:149;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2360:149:5;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2360:149:5;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2360:149:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2360:149:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2360:149:5;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2360:149:5;;;;;;;;;;;;;;;;2331:178;;2608:4;2570:5;:15;;:35;2586:18;-1:-1:-1;;;;;2570:35:5;-1:-1:-1;;;;;2570:35:5;;;;;;;;;;;;;:42;;;;;;;;;;;;;;;;;;2671:5;:15;;2692:18;2671:40;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;2671:40:5;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2671:40:5;;;;;-1:-1:-1;;;;;2671:40:5;;;;;;;2795:18;-1:-1:-1;;;;;2766:190:5;;2827:8;2849:11;;2874:6;;2894:12;2920:5;;2939:7;;2766:190;;;;-1:-1:-1;;;;;2766:190:5;-1:-1:-1;;;;;2766:190:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2766:190:5;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2766:190:5;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2766:190:5;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2974:18;1979:1020;-1:-1:-1;;;;;;;;;;;1979:1020:5:o;3685:119:16:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:16;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:16;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:16;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;:::o;4008:160::-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:16;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:16;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:16;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ISetFactory } from \"../interfaces/ISetFactory.sol\";\n\n\n/**\n * @title Core Factory\n * @author Set Protocol\n *\n * The CoreFactory contract contains Set Token creation operations\n */\ncontract CoreFactory is\n    CoreState\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Events ============ */\n\n    event SetTokenCreated(\n        address indexed _setTokenAddress,\n        address _factory,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    );\n\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factory              The address of the Factory to create from\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The name of the new Set\n     * @param  _symbol               The symbol of the new Set\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address _factory,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        returns (address)\n    {\n        // Verify Factory is linked to Core\n        require(state.validFactories[_factory]);\n\n        // Create the Set\n        address newSetTokenAddress = ISetFactory(_factory).create(\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        // Add Set to the mapping of tracked Sets\n        state.validSets[newSetTokenAddress] = true;\n\n        // Add Set to the array of tracked Sets\n        state.setTokens.push(newSetTokenAddress);\n\n        // Emit Set Token creation log\n        emit SetTokenCreated(\n            newSetTokenAddress,\n            _factory,\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        return newSetTokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        931
      ]
    },
    "id": 932,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 833,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 835,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 3894,
        "src": "622:73:5",
        "symbolAliases": [
          {
            "foreign": 834,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 837,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 2747,
        "src": "696:49:5",
        "symbolAliases": [
          {
            "foreign": 836,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 839,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 2521,
        "src": "746:60:5",
        "symbolAliases": [
          {
            "foreign": 838,
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
              "id": 840,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2746,
              "src": "962:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2746",
                "typeString": "contract CoreState"
              }
            },
            "id": 841,
            "nodeType": "InheritanceSpecifier",
            "src": "962:9:5"
          }
        ],
        "contractDependencies": [
          2746
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreFactory contract contains Set Token creation operations",
        "fullyImplemented": true,
        "id": 931,
        "linearizedBaseContracts": [
          931,
          2746
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 844,
            "libraryName": {
              "contractScope": null,
              "id": 842,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1039:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1033:27:5",
            "typeName": {
              "id": 843,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1052:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 862,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 861,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 846,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1141:32:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 845,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1141:7:5",
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
                  "id": 848,
                  "indexed": false,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1183:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 847,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1183:7:5",
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
                  "id": 851,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1209:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 849,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1209:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 850,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1209:9:5",
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
                  "id": 854,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1240:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 852,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1240:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 853,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1240:6:5",
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
                  "id": 856,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1263:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 855,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1263:4:5",
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
                  "id": 858,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1290:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 857,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1290:6:5",
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
                  "id": 860,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1312:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 859,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1131:201:5"
            },
            "src": "1110:223:5"
          },
          {
            "body": {
              "id": 929,
              "nodeType": "Block",
              "src": "2201:798:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 882,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2642,
                            "src": "2263:5:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2640_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 883,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2621,
                          "src": "2263:20:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 885,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 884,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 864,
                          "src": "2284:8:5",
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
                        "src": "2263:30:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 881,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "2255:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 886,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2255:39:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 887,
                  "nodeType": "ExpressionStatement",
                  "src": "2255:39:5"
                },
                {
                  "assignments": [
                    889
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 889,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 930,
                      "src": "2331:26:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 888,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2331:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 900,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 894,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 867,
                        "src": "2402:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 895,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 870,
                        "src": "2427:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 896,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 872,
                        "src": "2447:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 897,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 874,
                        "src": "2473:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 898,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 876,
                        "src": "2492:7:5",
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
                            "id": 891,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 864,
                            "src": "2372:8:5",
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
                          "id": 890,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2520,
                          "src": "2360:11:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2520_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 892,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2360:21:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2520",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 893,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2519,
                      "src": "2360:28:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 899,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2360:149:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2331:178:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 907,
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
                          "id": 901,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2570:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 904,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2628,
                        "src": "2570:15:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 905,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 903,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2586:18:5",
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
                      "src": "2570:35:5",
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
                      "id": 906,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2608:4:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2570:42:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 908,
                  "nodeType": "ExpressionStatement",
                  "src": "2570:42:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 914,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2692:18:5",
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
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 909,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2671:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 912,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2631,
                        "src": "2671:15:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 913,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2671:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 915,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2671:40:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 916,
                  "nodeType": "ExpressionStatement",
                  "src": "2671:40:5"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 918,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2795:18:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 919,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 864,
                        "src": "2827:8:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 920,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 867,
                        "src": "2849:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 921,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 870,
                        "src": "2874:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 922,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 872,
                        "src": "2894:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 923,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 874,
                        "src": "2920:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 924,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 876,
                        "src": "2939:7:5",
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
                      "id": 917,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 862,
                      "src": "2766:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 925,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2766:190:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 926,
                  "nodeType": "EmitStatement",
                  "src": "2761:195:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 927,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 889,
                    "src": "2974:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 880,
                  "id": 928,
                  "nodeType": "Return",
                  "src": "2967:25:5"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 930,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 877,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 864,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2004:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 863,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2004:7:5",
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
                  "id": 867,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2030:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 865,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2030:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 866,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2030:9:5",
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
                  "id": 870,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2061:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 868,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2061:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 869,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2061:6:5",
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
                  "id": 872,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2084:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 871,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2084:4:5",
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
                  "id": 874,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2111:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 873,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2111:6:5",
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
                  "id": 876,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2133:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 875,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1994:159:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 880,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 879,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2188:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 878,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2188:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2187:9:5"
            },
            "scope": 931,
            "src": "1979:1020:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 932,
        "src": "934:2067:5"
      }
    ],
    "src": "597:2405:5"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        931
      ]
    },
    "id": 932,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 833,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 835,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 3894,
        "src": "622:73:5",
        "symbolAliases": [
          {
            "foreign": 834,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 837,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 2747,
        "src": "696:49:5",
        "symbolAliases": [
          {
            "foreign": 836,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 839,
        "nodeType": "ImportDirective",
        "scope": 932,
        "sourceUnit": 2521,
        "src": "746:60:5",
        "symbolAliases": [
          {
            "foreign": 838,
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
              "id": 840,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2746,
              "src": "962:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2746",
                "typeString": "contract CoreState"
              }
            },
            "id": 841,
            "nodeType": "InheritanceSpecifier",
            "src": "962:9:5"
          }
        ],
        "contractDependencies": [
          2746
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreFactory contract contains Set Token creation operations",
        "fullyImplemented": true,
        "id": 931,
        "linearizedBaseContracts": [
          931,
          2746
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 844,
            "libraryName": {
              "contractScope": null,
              "id": 842,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1039:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1033:27:5",
            "typeName": {
              "id": 843,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1052:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 862,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 861,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 846,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1141:32:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 845,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1141:7:5",
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
                  "id": 848,
                  "indexed": false,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1183:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 847,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1183:7:5",
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
                  "id": 851,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1209:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 849,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1209:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 850,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1209:9:5",
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
                  "id": 854,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1240:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 852,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1240:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 853,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1240:6:5",
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
                  "id": 856,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1263:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 855,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1263:4:5",
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
                  "id": 858,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1290:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 857,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1290:6:5",
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
                  "id": 860,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 862,
                  "src": "1312:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 859,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1312:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1131:201:5"
            },
            "src": "1110:223:5"
          },
          {
            "body": {
              "id": 929,
              "nodeType": "Block",
              "src": "2201:798:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 882,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 2642,
                            "src": "2263:5:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$2640_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 883,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 2621,
                          "src": "2263:20:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 885,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 884,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 864,
                          "src": "2284:8:5",
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
                        "src": "2263:30:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 881,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "2255:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 886,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2255:39:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 887,
                  "nodeType": "ExpressionStatement",
                  "src": "2255:39:5"
                },
                {
                  "assignments": [
                    889
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 889,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 930,
                      "src": "2331:26:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 888,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2331:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 900,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 894,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 867,
                        "src": "2402:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 895,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 870,
                        "src": "2427:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 896,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 872,
                        "src": "2447:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 897,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 874,
                        "src": "2473:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 898,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 876,
                        "src": "2492:7:5",
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
                            "id": 891,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 864,
                            "src": "2372:8:5",
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
                          "id": 890,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2520,
                          "src": "2360:11:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2520_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 892,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2360:21:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2520",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 893,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2519,
                      "src": "2360:28:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 899,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2360:149:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2331:178:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 907,
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
                          "id": 901,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2570:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 904,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2628,
                        "src": "2570:15:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 905,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 903,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2586:18:5",
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
                      "src": "2570:35:5",
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
                      "id": 906,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2608:4:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2570:42:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 908,
                  "nodeType": "ExpressionStatement",
                  "src": "2570:42:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 914,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2692:18:5",
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
                      "expression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 909,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2671:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 912,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2631,
                        "src": "2671:15:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 913,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2671:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 915,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2671:40:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 916,
                  "nodeType": "ExpressionStatement",
                  "src": "2671:40:5"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 918,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 889,
                        "src": "2795:18:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 919,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 864,
                        "src": "2827:8:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 920,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 867,
                        "src": "2849:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 921,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 870,
                        "src": "2874:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 922,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 872,
                        "src": "2894:12:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 923,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 874,
                        "src": "2920:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 924,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 876,
                        "src": "2939:7:5",
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
                      "id": 917,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 862,
                      "src": "2766:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 925,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2766:190:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 926,
                  "nodeType": "EmitStatement",
                  "src": "2761:195:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 927,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 889,
                    "src": "2974:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 880,
                  "id": 928,
                  "nodeType": "Return",
                  "src": "2967:25:5"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 930,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 877,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 864,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2004:16:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 863,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2004:7:5",
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
                  "id": 867,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2030:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 865,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2030:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 866,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2030:9:5",
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
                  "id": 870,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2061:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 868,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2061:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 869,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2061:6:5",
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
                  "id": 872,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2084:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 871,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2084:4:5",
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
                  "id": 874,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2111:12:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 873,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2111:6:5",
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
                  "id": 876,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2133:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 875,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2133:6:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1994:159:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 880,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 879,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 930,
                  "src": "2188:7:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 878,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2188:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2187:9:5"
            },
            "scope": 931,
            "src": "1979:1020:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 932,
        "src": "934:2067:5"
      }
    ],
    "src": "597:2405:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.855Z"
}