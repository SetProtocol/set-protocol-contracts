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
  "bytecode": "0x608060405234801561001057600080fd5b50610826806100206000396000f3006080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100e85780635290444914610112578063559ed339146101835780636e667db3146101e8578063a003e069146101fd578063c19d93fb14610218578063f7213db614610253578063fbfa77cf1461026b578063fe5b38e414610280578063fef3ee7314610295575b600080fd5b3480156100bf57600080fd5b506100d4600160a060020a03600435166102b6565b604080519115158252519081900360200190f35b3480156100f457600080fd5b506101006004356102d4565b60408051918252519081900360200190f35b34801561011e57600080fd5b5061016760048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a4359182019101356102e6565b60408051600160a060020a039092168252519081900360200190f35b34801561018f57600080fd5b506101986106b0565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d45781810151838201526020016101bc565b505050509050019250505060405180910390f35b3480156101f457600080fd5b50610167610715565b34801561020957600080fd5b5061016760ff60043516610724565b34801561022457600080fd5b5061022d610742565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561025f57600080fd5b50610100600435610758565b34801561027757600080fd5b5061016761076a565b34801561028c57600080fd5b50610198610779565b3480156102a157600080fd5b506100d4600160a060020a03600435166107dc565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b600160a060020a038a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610409576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103ce5781810151838201526020016103b6565b50505050905090810190601f1680156103fb5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c600160a060020a031663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b1580156104f257600080fd5b505af1158015610506573d6000803e3d6000fd5b505050506040513d602081101561051c57600080fd5b8101908080519060200190929190505050915060016000600501600084600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a815481600160a060020a030219169083600160a060020a031602179055505081600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561070b57602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116106ed575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561070b57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116106ed575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a723058201951014e8038d415a0c9e1f3865d1f64350b919403887f87a6abd79099fe2eec0029",
  "deployedBytecode": "0x6080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100e85780635290444914610112578063559ed339146101835780636e667db3146101e8578063a003e069146101fd578063c19d93fb14610218578063f7213db614610253578063fbfa77cf1461026b578063fe5b38e414610280578063fef3ee7314610295575b600080fd5b3480156100bf57600080fd5b506100d4600160a060020a03600435166102b6565b604080519115158252519081900360200190f35b3480156100f457600080fd5b506101006004356102d4565b60408051918252519081900360200190f35b34801561011e57600080fd5b5061016760048035600160a060020a031690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a4359182019101356102e6565b60408051600160a060020a039092168252519081900360200190f35b34801561018f57600080fd5b506101986106b0565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d45781810151838201526020016101bc565b505050509050019250505060405180910390f35b3480156101f457600080fd5b50610167610715565b34801561020957600080fd5b5061016760ff60043516610724565b34801561022457600080fd5b5061022d610742565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561025f57600080fd5b50610100600435610758565b34801561027757600080fd5b5061016761076a565b34801561028c57600080fd5b50610198610779565b3480156102a157600080fd5b506100d4600160a060020a03600435166107dc565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b600160a060020a038a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610409576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103ce5781810151838201526020016103b6565b50505050905090810190601f1680156103fb5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c600160a060020a031663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b1580156104f257600080fd5b505af1158015610506573d6000803e3d6000fd5b505050506040513d602081101561051c57600080fd5b8101908080519060200190929190505050915060016000600501600084600160a060020a0316600160a060020a0316815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a815481600160a060020a030219169083600160a060020a031602179055505081600160a060020a03167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b600160a060020a0316600160a060020a031681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561070b57602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116106ed575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561070b57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116106ed575050505050905090565b600160a060020a031660009081526005602052604090205460ff16905600a165627a7a723058201951014e8038d415a0c9e1f3865d1f64350b919403887f87a6abd79099fe2eec0029",
  "sourceMap": "998:2153:11:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;998:2153:11;;;;;;;",
  "deployedSourceMap": "998:2153:11:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:24;-1:-1:-1;;;;;2803:164:24;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:24;;;;;;;;;;;;;;;;;;;;;2190:959:11;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2190:959:11;;;;-1:-1:-1;;;;;2190:959:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2190:959:11;;;;;;;;;;;;;;3685:119:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:24;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:24;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:24;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:24;;;;;;;;-1:-1:-1;;;;;1710:18:24;;;;;;;;;;;;;;;;;;;;;;;;4008:160;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:24;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:24;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:24;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:24;-1:-1:-1;;;;;3409:146:24;;;;;2803:164;-1:-1:-1;;;;;2930:30:24;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;2190:959:11:-;-1:-1:-1;;;;;1702:30:23;;2432:7:11;1702:30:23;;;:20;:30;;;;;;;;;1746:15;;;;;;;;;;;;;;;;;;;;;;;;;;2432:7:11;;2405:8;;1702:30:23;;1681:90;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1681:90:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2522:8:11;-1:-1:-1;;;;;2510:28:11;;2552:11;;2577:6;;2597:12;2623:5;;2642:7;;2510:149;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2510:149:11;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2510:149:11;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2510:149:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2510:149:11;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2510:149:11;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2510:149:11;;;;;;;;;;;;;;;;2481:178;;2758:4;2720:5;:15;;:35;2736:18;-1:-1:-1;;;;;2720:35:11;-1:-1:-1;;;;;2720:35:11;;;;;;;;;;;;;:42;;;;;;;;;;;;;;;;;;2821:5;:15;;2842:18;2821:40;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;2821:40:11;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2821:40:11;;;;;-1:-1:-1;;;;;2821:40:11;;;;;;;2945:18;-1:-1:-1;;;;;2916:190:11;;2977:8;2999:11;;3024:6;;3044:12;3070:5;;3089:7;;2916:190;;;;-1:-1:-1;;;;;2916:190:11;-1:-1:-1;;;;;2916:190:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2916:190:11;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2916:190:11;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2916:190:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3124:18:11;2190:959;-1:-1:-1;;;;;;;;;;;2190:959:11:o;3685:119:24:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:24;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:24;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:24;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:24;;;;;;:::o;4008:160::-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:24;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:24;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:24;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ISetFactory } from \"../interfaces/ISetFactory.sol\";\n\n\n/**\n * @title Core Factory\n * @author Set Protocol\n *\n * The CoreFactory contract contains Set Token creation operations\n */\ncontract CoreFactory is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Events ============ */\n\n    event SetTokenCreated(\n        address indexed _setTokenAddress,\n        address _factory,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    );\n\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factory              The address of the Factory to create from\n     * @param  _components           The address of component tokens\n     * @param  _units                The units of each component token\n     * @param  _naturalUnit          The minimum unit to be issued or redeemed\n     * @param  _name                 The name of the new Set\n     * @param  _symbol               The symbol of the new Set\n     * @return setTokenAddress       The address of the new Set\n     */\n    function create(\n        address _factory,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        isValidFactory(_factory)\n        returns (address)\n    {\n        // Create the Set\n        address newSetTokenAddress = ISetFactory(_factory).create(\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        // Add Set to the mapping of tracked Sets\n        state.validSets[newSetTokenAddress] = true;\n\n        // Add Set to the array of tracked Sets\n        state.setTokens.push(newSetTokenAddress);\n\n        // Emit Set Token creation log\n        emit SetTokenCreated(\n            newSetTokenAddress,\n            _factory,\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        return newSetTokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1826
      ]
    },
    "id": 1827,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1725,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1727,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 6703,
        "src": "622:73:11",
        "symbolAliases": [
          {
            "foreign": 1726,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1729,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3686,
        "src": "696:63:11",
        "symbolAliases": [
          {
            "foreign": 1728,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1731,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3825,
        "src": "760:49:11",
        "symbolAliases": [
          {
            "foreign": 1730,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1733,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3516,
        "src": "810:60:11",
        "symbolAliases": [
          {
            "foreign": 1732,
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
              "id": 1734,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3824,
              "src": "1026:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3824",
                "typeString": "contract CoreState"
              }
            },
            "id": 1735,
            "nodeType": "InheritanceSpecifier",
            "src": "1026:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1736,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3685,
              "src": "1041:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3685",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1737,
            "nodeType": "InheritanceSpecifier",
            "src": "1041:13:11"
          }
        ],
        "contractDependencies": [
          3685,
          3824
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreFactory contract contains Set Token creation operations",
        "fullyImplemented": true,
        "id": 1826,
        "linearizedBaseContracts": [
          1826,
          3685,
          3824
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1740,
            "libraryName": {
              "contractScope": null,
              "id": 1738,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1122:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1116:27:11",
            "typeName": {
              "id": 1739,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1135:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1743,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1826,
            "src": "1196:74:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1741,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1196:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1742,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1230:40:11",
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
            "id": 1761,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1760,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1745,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1352:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1744,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1352:7:11",
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
                  "id": 1747,
                  "indexed": false,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1394:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1394:7:11",
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
                  "id": 1750,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1420:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1748,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1420:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1749,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1420:9:11",
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
                  "id": 1753,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1451:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1751,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1451:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1752,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1451:6:11",
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
                  "id": 1755,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1474:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1754,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:4:11",
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
                  "id": 1757,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1501:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1756,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1501:6:11",
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
                  "id": 1759,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1523:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1758,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1523:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1342:201:11"
            },
            "src": "1321:223:11"
          },
          {
            "body": {
              "id": 1824,
              "nodeType": "Block",
              "src": "2445:704:11",
              "statements": [
                {
                  "assignments": [
                    1784
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1784,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1825,
                      "src": "2481:26:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1783,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2481:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1795,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1789,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1766,
                        "src": "2552:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1790,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1769,
                        "src": "2577:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1791,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1771,
                        "src": "2597:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1792,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1773,
                        "src": "2623:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1793,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1775,
                        "src": "2642:7:11",
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
                            "id": 1786,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1763,
                            "src": "2522:8:11",
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
                          "id": 1785,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3515,
                          "src": "2510:11:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$3515_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1787,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2510:21:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$3515",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1788,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3514,
                      "src": "2510:28:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1794,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2510:149:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2481:178:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1802,
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
                          "id": 1796,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2720:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1799,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3706,
                        "src": "2720:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1800,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1798,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2736:18:11",
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
                      "src": "2720:35:11",
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
                      "id": 1801,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2758:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2720:42:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1803,
                  "nodeType": "ExpressionStatement",
                  "src": "2720:42:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1809,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2842:18:11",
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
                          "id": 1804,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2821:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1807,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3709,
                        "src": "2821:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1808,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:20:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1810,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2821:40:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1811,
                  "nodeType": "ExpressionStatement",
                  "src": "2821:40:11"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1813,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2945:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1814,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1763,
                        "src": "2977:8:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1815,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1766,
                        "src": "2999:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1769,
                        "src": "3024:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1817,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1771,
                        "src": "3044:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1818,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1773,
                        "src": "3070:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1819,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1775,
                        "src": "3089:7:11",
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
                      "id": 1812,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1761,
                      "src": "2916:15:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2916:190:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1821,
                  "nodeType": "EmitStatement",
                  "src": "2911:195:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1822,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1784,
                    "src": "3124:18:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1782,
                  "id": 1823,
                  "nodeType": "Return",
                  "src": "3117:25:11"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 1825,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1778,
                    "name": "_factory",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1763,
                    "src": "2405:8:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1779,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1777,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3649,
                  "src": "2390:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2390:24:11"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1776,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1763,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2215:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2215:7:11",
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
                  "id": 1766,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2241:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1764,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2241:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1765,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2241:9:11",
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
                  "id": 1769,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2272:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1767,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2272:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1768,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2272:6:11",
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
                  "id": 1771,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2295:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1770,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2295:4:11",
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
                  "id": 1773,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2322:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1772,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2322:6:11",
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
                  "id": 1775,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2344:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1774,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2344:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2205:159:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1781,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2432:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1780,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2432:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:9:11"
            },
            "scope": 1826,
            "src": "2190:959:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1827,
        "src": "998:2153:11"
      }
    ],
    "src": "597:2555:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1826
      ]
    },
    "id": 1827,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1725,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:11"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1727,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 6703,
        "src": "622:73:11",
        "symbolAliases": [
          {
            "foreign": 1726,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1729,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3686,
        "src": "696:63:11",
        "symbolAliases": [
          {
            "foreign": 1728,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1731,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3825,
        "src": "760:49:11",
        "symbolAliases": [
          {
            "foreign": 1730,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1733,
        "nodeType": "ImportDirective",
        "scope": 1827,
        "sourceUnit": 3516,
        "src": "810:60:11",
        "symbolAliases": [
          {
            "foreign": 1732,
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
              "id": 1734,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3824,
              "src": "1026:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3824",
                "typeString": "contract CoreState"
              }
            },
            "id": 1735,
            "nodeType": "InheritanceSpecifier",
            "src": "1026:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1736,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3685,
              "src": "1041:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3685",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1737,
            "nodeType": "InheritanceSpecifier",
            "src": "1041:13:11"
          }
        ],
        "contractDependencies": [
          3685,
          3824
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreFactory contract contains Set Token creation operations",
        "fullyImplemented": true,
        "id": 1826,
        "linearizedBaseContracts": [
          1826,
          3685,
          3824
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1740,
            "libraryName": {
              "contractScope": null,
              "id": 1738,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6702,
              "src": "1122:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6702",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1116:27:11",
            "typeName": {
              "id": 1739,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1135:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1743,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1826,
            "src": "1196:74:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1741,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1196:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1742,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1230:40:11",
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
            "id": 1761,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1760,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1745,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1352:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1744,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1352:7:11",
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
                  "id": 1747,
                  "indexed": false,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1394:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1746,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1394:7:11",
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
                  "id": 1750,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1420:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1748,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1420:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1749,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1420:9:11",
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
                  "id": 1753,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1451:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1751,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1451:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1752,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1451:6:11",
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
                  "id": 1755,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1474:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1754,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1474:4:11",
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
                  "id": 1757,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1501:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1756,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1501:6:11",
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
                  "id": 1759,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1761,
                  "src": "1523:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1758,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1523:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1342:201:11"
            },
            "src": "1321:223:11"
          },
          {
            "body": {
              "id": 1824,
              "nodeType": "Block",
              "src": "2445:704:11",
              "statements": [
                {
                  "assignments": [
                    1784
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1784,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1825,
                      "src": "2481:26:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1783,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2481:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1795,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1789,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1766,
                        "src": "2552:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1790,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1769,
                        "src": "2577:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1791,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1771,
                        "src": "2597:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1792,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1773,
                        "src": "2623:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1793,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1775,
                        "src": "2642:7:11",
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
                            "id": 1786,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1763,
                            "src": "2522:8:11",
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
                          "id": 1785,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3515,
                          "src": "2510:11:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$3515_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1787,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2510:21:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$3515",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1788,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3514,
                      "src": "2510:28:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1794,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2510:149:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2481:178:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1802,
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
                          "id": 1796,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2720:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1799,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3706,
                        "src": "2720:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1800,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1798,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2736:18:11",
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
                      "src": "2720:35:11",
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
                      "id": 1801,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2758:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2720:42:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1803,
                  "nodeType": "ExpressionStatement",
                  "src": "2720:42:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1809,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2842:18:11",
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
                          "id": 1804,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2821:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1807,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3709,
                        "src": "2821:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1808,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:20:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1810,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2821:40:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1811,
                  "nodeType": "ExpressionStatement",
                  "src": "2821:40:11"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1813,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1784,
                        "src": "2945:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1814,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1763,
                        "src": "2977:8:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1815,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1766,
                        "src": "2999:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1769,
                        "src": "3024:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1817,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1771,
                        "src": "3044:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1818,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1773,
                        "src": "3070:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1819,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1775,
                        "src": "3089:7:11",
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
                      "id": 1812,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1761,
                      "src": "2916:15:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2916:190:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1821,
                  "nodeType": "EmitStatement",
                  "src": "2911:195:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1822,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1784,
                    "src": "3124:18:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1782,
                  "id": 1823,
                  "nodeType": "Return",
                  "src": "3117:25:11"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factory              The address of the Factory to create from\n@param  _components           The address of component tokens\n@param  _units                The units of each component token\n@param  _naturalUnit          The minimum unit to be issued or redeemed\n@param  _name                 The name of the new Set\n@param  _symbol               The symbol of the new Set\n@return setTokenAddress       The address of the new Set",
            "id": 1825,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1778,
                    "name": "_factory",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1763,
                    "src": "2405:8:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1779,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1777,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3649,
                  "src": "2390:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2390:24:11"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1776,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1763,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2215:16:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1762,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2215:7:11",
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
                  "id": 1766,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2241:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1764,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2241:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1765,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2241:9:11",
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
                  "id": 1769,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2272:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1767,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2272:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1768,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2272:6:11",
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
                  "id": 1771,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2295:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1770,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2295:4:11",
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
                  "id": 1773,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2322:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1772,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2322:6:11",
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
                  "id": 1775,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2344:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1774,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2344:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2205:159:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1781,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1825,
                  "src": "2432:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1780,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2432:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:9:11"
            },
            "scope": 1826,
            "src": "2190:959:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1827,
        "src": "998:2153:11"
      }
    ],
    "src": "597:2555:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.811Z"
}