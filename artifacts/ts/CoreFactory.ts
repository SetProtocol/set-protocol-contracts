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
  "bytecode": "0x608060405234801561001057600080fd5b50610944806100206000396000f3006080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100f5578063430bf08a1461011f578063529044491461015d578063559ed339146101bf5780638ca4daf914610224578063a003e06914610239578063c19d93fb14610254578063f7213db61461029c578063fe5b38e4146102b4578063fef3ee73146102c9575b600080fd5b3480156100bf57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff600435166102f7565b604080519115158252519081900360200190f35b34801561010157600080fd5b5061010d600435610322565b60408051918252519081900360200190f35b34801561012b57600080fd5b50610134610334565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561016957600080fd5b506101346004803573ffffffffffffffffffffffffffffffffffffffff1690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a435918201910135610350565b3480156101cb57600080fd5b506101d461078f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156102105781810151838201526020016101f8565b505050509050019250505060405180910390f35b34801561023057600080fd5b50610134610801565b34801561024557600080fd5b5061013460ff6004351661081d565b34801561026057600080fd5b50610269610848565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102a857600080fd5b5061010d60043561086b565b3480156102c057600080fd5b506101d461087d565b3480156102d557600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff600435166108ed565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff8a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610480576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561044557818101518382015260200161042d565b50505050905090810190601f1680156104725780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c73ffffffffffffffffffffffffffffffffffffffff1663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561057657600080fd5b505af115801561058a573d6000803e3d6000fd5b505050506040513d60208110156105a057600080fd5b810190808051906020019092919050505091506001600060050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508173ffffffffffffffffffffffffffffffffffffffff167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b606060006006018054806020026020016040519081016040528092919081815260200182805480156107f757602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116107cc575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b606060006004018054806020026020016040519081016040528092919081815260200182805480156107f75760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116107cc575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a7230582093f14d6454f472a266060f12468a1b0f89c805e80a0d505af39c16d29a4f33800029",
  "deployedBytecode": "0x6080604052600436106100ae5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100b35780631e912bd6146100f5578063430bf08a1461011f578063529044491461015d578063559ed339146101bf5780638ca4daf914610224578063a003e06914610239578063c19d93fb14610254578063f7213db61461029c578063fe5b38e4146102b4578063fef3ee73146102c9575b600080fd5b3480156100bf57600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff600435166102f7565b604080519115158252519081900360200190f35b34801561010157600080fd5b5061010d600435610322565b60408051918252519081900360200190f35b34801561012b57600080fd5b50610134610334565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561016957600080fd5b506101346004803573ffffffffffffffffffffffffffffffffffffffff1690602480358082019290810135916044358082019290810135916064359160843580830192908201359160a435918201910135610350565b3480156101cb57600080fd5b506101d461078f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156102105781810151838201526020016101f8565b505050509050019250505060405180910390f35b34801561023057600080fd5b50610134610801565b34801561024557600080fd5b5061013460ff6004351661081d565b34801561026057600080fd5b50610269610848565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102a857600080fd5b5061010d60043561086b565b3480156102c057600080fd5b506101d461087d565b3480156102d557600080fd5b506100e173ffffffffffffffffffffffffffffffffffffffff600435166108ed565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff8a166000908152600360209081526040808320548151606081018352602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420938101939093527f65786973742e00000000000000000000000000000000000000000000000000009183019190915282918d9160ff161515610480576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561044557818101518382015260200161042d565b50505050905090810190601f1680156104725780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c73ffffffffffffffffffffffffffffffffffffffff1663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561057657600080fd5b505af115801561058a573d6000803e3d6000fd5b505050506040513d60208110156105a057600080fd5b810190808051906020019092919050505091506001600060050160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060006006018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550508173ffffffffffffffffffffffffffffffffffffffff167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001888152602001806020018060200185810385528e8e8281815260200192506020028082843790910186810385528c8152602090810191508d908d0280828437909101868103845289815260200190508989808284379091018681038352878152602001905087878082843782019150509e50505050505050505050505050505060405180910390a2509b9a5050505050505050505050565b606060006006018054806020026020016040519081016040528092919081815260200182805480156107f757602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116107cc575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60009081526007602052604090205490565b606060006004018054806020026020016040519081016040528092919081815260200182805480156107f75760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff1681526001909101906020018083116107cc575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a7230582093f14d6454f472a266060f12468a1b0f89c805e80a0d505af39c16d29a4f33800029",
  "sourceMap": "995:2210:11:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;995:2210:11;;;;;;;",
  "deployedSourceMap": "995:2210:11:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;2924;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;2099:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;2255:948:11;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2255:948:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;1954:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;1801:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2772:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;2924:::-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;2099:123::-;2197:18;;;;2099:123;:::o;2255:948:11:-;1709:37:22;;;2511:7:11;1709:37:22;;;:20;:37;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;;;;2511:7:11;;2477:15;;1709:37:22;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1688:97:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2601:15:11;2589:35;;;2638:11;;2663:6;;2683:12;2709:5;;2728:7;;2589:156;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:11;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:11;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2589:156:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2589:156:11;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2589:156:11;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2589:156:11;;;;;;;;;;;;;;;;2560:185;;2844:4;2806:5;:15;;:35;2822:18;2806:35;;;;;;;;;;;;;;;;:42;;;;;;;;;;;;;;;;;;2907:5;:15;;2928:18;2907:40;;39:1:-1;33:3;27:10;23:18;57:10;52:3;45:23;79:10;72:17;;0:93;2907:40:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2992:18;2963:197;;;3024:15;3053:11;;3078:6;;3098:12;3124:5;;3143:7;;2963:197;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2963:197:11;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2963:197:11;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2963:197:11;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3178:18:11;2255:948;-1:-1:-1;;;;;;;;;;;2255:948:11:o;2647:119:23:-;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;1954:139::-;2060:26;;;;1954:139;:::o;1801:147::-;1913:28;;1883:7;1913:28;;;;;;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;2772:146::-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ISetFactory } from \"../interfaces/ISetFactory.sol\";\n\n\n/**\n * @title Core Factory\n * @author Set Protocol\n *\n * The CoreCreate contract contains public set token operations\n */\ncontract CoreFactory is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Events ============ */\n\n    event SetTokenCreated(\n        address indexed _setTokenAddress,\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    );\n\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factoryAddress  address       The address of the Factory to create from\n     * @param  _components      address[]     The address of component tokens\n     * @param  _units           uint[]        The units of each component token\n     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n     * @param  _name            string        The name of the new Set\n     * @param  _symbol          string        The symbol of the new Set\n     * @return setTokenAddress address        The address of the new Set\n     */\n    function create(\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        isValidFactory(_factoryAddress)\n        returns (address)\n    {\n        // Create the Set\n        address newSetTokenAddress = ISetFactory(_factoryAddress).create(\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        // Add Set to the mapping of tracked Sets\n        state.validSets[newSetTokenAddress] = true;\n\n        // Add Set to the array of tracked Sets\n        state.setTokens.push(newSetTokenAddress);\n\n        emit SetTokenCreated(\n            newSetTokenAddress,\n            _factoryAddress,\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        return newSetTokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1751
      ]
    },
    "id": 1752,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1650,
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
        "id": 1652,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 6347,
        "src": "622:73:11",
        "symbolAliases": [
          {
            "foreign": 1651,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1654,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3455,
        "src": "696:63:11",
        "symbolAliases": [
          {
            "foreign": 1653,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1656,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3594,
        "src": "760:49:11",
        "symbolAliases": [
          {
            "foreign": 1655,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1658,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3285,
        "src": "810:60:11",
        "symbolAliases": [
          {
            "foreign": 1657,
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
              "id": 1659,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1023:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1660,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1661,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1038:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1662,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:11"
          }
        ],
        "contractDependencies": [
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1751,
        "linearizedBaseContracts": [
          1751,
          3454,
          3593
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1665,
            "libraryName": {
              "contractScope": null,
              "id": 1663,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1119:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:11",
            "typeName": {
              "id": 1664,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1668,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1751,
            "src": "1193:74:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1666,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1667,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:11",
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
            "id": 1686,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1670,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1349:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1669,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:11",
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
                  "id": 1672,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1391:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:11",
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
                  "id": 1675,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1424:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1673,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1674,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:11",
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
                  "id": 1678,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1455:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1676,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1677,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:11",
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
                  "id": 1680,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1478:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1679,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:11",
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
                  "id": 1682,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1505:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1681,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:11",
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
                  "id": 1684,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1527:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1683,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:11"
            },
            "src": "1318:230:11"
          },
          {
            "body": {
              "id": 1749,
              "nodeType": "Block",
              "src": "2524:679:11",
              "statements": [
                {
                  "assignments": [
                    1709
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1709,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1750,
                      "src": "2560:26:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1708,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1720,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1714,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1691,
                        "src": "2638:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1715,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1694,
                        "src": "2663:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1716,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1696,
                        "src": "2683:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1717,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1698,
                        "src": "2709:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1718,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1700,
                        "src": "2728:7:11",
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
                            "id": 1711,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1688,
                            "src": "2601:15:11",
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
                          "id": 1710,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3284,
                          "src": "2589:11:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$3284_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1712,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$3284",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1713,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3283,
                      "src": "2589:35:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1719,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1727,
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
                          "id": 1721,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2806:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1724,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3475,
                        "src": "2806:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1725,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1723,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2822:18:11",
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
                      "src": "2806:35:11",
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
                      "id": 1726,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2844:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2806:42:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1728,
                  "nodeType": "ExpressionStatement",
                  "src": "2806:42:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1734,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2928:18:11",
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
                          "id": 1729,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2907:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1732,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3478,
                        "src": "2907:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1733,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2907:20:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1735,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2907:40:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1736,
                  "nodeType": "ExpressionStatement",
                  "src": "2907:40:11"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1738,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2992:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1739,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1688,
                        "src": "3024:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1740,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1691,
                        "src": "3053:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1741,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1694,
                        "src": "3078:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1742,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1696,
                        "src": "3098:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1743,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1698,
                        "src": "3124:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1744,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1700,
                        "src": "3143:7:11",
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
                      "id": 1737,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1686,
                      "src": "2963:15:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1745,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2963:197:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1746,
                  "nodeType": "EmitStatement",
                  "src": "2958:202:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1747,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1709,
                    "src": "3178:18:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1707,
                  "id": 1748,
                  "nodeType": "Return",
                  "src": "3171:25:11"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1750,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1703,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1688,
                    "src": "2477:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1704,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1702,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3418,
                  "src": "2462:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:11"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1688,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2280:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:11",
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
                  "id": 1691,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2313:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1689,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1690,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:11",
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
                  "id": 1694,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2344:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1692,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1693,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:11",
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
                  "id": 1696,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2367:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1695,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:11",
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
                  "id": 1698,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2394:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1697,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:11",
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
                  "id": 1700,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2416:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1699,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1706,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2511:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:11"
            },
            "scope": 1751,
            "src": "2255:948:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1752,
        "src": "995:2210:11"
      }
    ],
    "src": "597:2609:11"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1751
      ]
    },
    "id": 1752,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1650,
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
        "id": 1652,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 6347,
        "src": "622:73:11",
        "symbolAliases": [
          {
            "foreign": 1651,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1654,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3455,
        "src": "696:63:11",
        "symbolAliases": [
          {
            "foreign": 1653,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1656,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3594,
        "src": "760:49:11",
        "symbolAliases": [
          {
            "foreign": 1655,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1658,
        "nodeType": "ImportDirective",
        "scope": 1752,
        "sourceUnit": 3285,
        "src": "810:60:11",
        "symbolAliases": [
          {
            "foreign": 1657,
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
              "id": 1659,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1023:9:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1660,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:11"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1661,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1038:13:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1662,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:11"
          }
        ],
        "contractDependencies": [
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1751,
        "linearizedBaseContracts": [
          1751,
          3454,
          3593
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1665,
            "libraryName": {
              "contractScope": null,
              "id": 1663,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1119:8:11",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:11",
            "typeName": {
              "id": 1664,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:11",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1668,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1751,
            "src": "1193:74:11",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1666,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:11",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1667,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:11",
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
            "id": 1686,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1685,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1670,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1349:32:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1669,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:11",
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
                  "id": 1672,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1391:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1671,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:11",
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
                  "id": 1675,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1424:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1673,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1674,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:11",
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
                  "id": 1678,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1455:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1676,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1677,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:11",
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
                  "id": 1680,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1478:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1679,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:11",
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
                  "id": 1682,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1505:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1681,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:11",
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
                  "id": 1684,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1686,
                  "src": "1527:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1683,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:11"
            },
            "src": "1318:230:11"
          },
          {
            "body": {
              "id": 1749,
              "nodeType": "Block",
              "src": "2524:679:11",
              "statements": [
                {
                  "assignments": [
                    1709
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1709,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1750,
                      "src": "2560:26:11",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1708,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1720,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1714,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1691,
                        "src": "2638:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1715,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1694,
                        "src": "2663:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1716,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1696,
                        "src": "2683:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1717,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1698,
                        "src": "2709:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1718,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1700,
                        "src": "2728:7:11",
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
                            "id": 1711,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1688,
                            "src": "2601:15:11",
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
                          "id": 1710,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3284,
                          "src": "2589:11:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$3284_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1712,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$3284",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1713,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3283,
                      "src": "2589:35:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1719,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1727,
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
                          "id": 1721,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2806:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1724,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3475,
                        "src": "2806:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1725,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1723,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2822:18:11",
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
                      "src": "2806:35:11",
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
                      "id": 1726,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2844:4:11",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2806:42:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1728,
                  "nodeType": "ExpressionStatement",
                  "src": "2806:42:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1734,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2928:18:11",
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
                          "id": 1729,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2907:5:11",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1732,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3478,
                        "src": "2907:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1733,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2907:20:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1735,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2907:40:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1736,
                  "nodeType": "ExpressionStatement",
                  "src": "2907:40:11"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1738,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1709,
                        "src": "2992:18:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1739,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1688,
                        "src": "3024:15:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1740,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1691,
                        "src": "3053:11:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1741,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1694,
                        "src": "3078:6:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1742,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1696,
                        "src": "3098:12:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1743,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1698,
                        "src": "3124:5:11",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1744,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1700,
                        "src": "3143:7:11",
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
                      "id": 1737,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1686,
                      "src": "2963:15:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1745,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2963:197:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1746,
                  "nodeType": "EmitStatement",
                  "src": "2958:202:11"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1747,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1709,
                    "src": "3178:18:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1707,
                  "id": 1748,
                  "nodeType": "Return",
                  "src": "3171:25:11"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1750,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1703,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1688,
                    "src": "2477:15:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1704,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1702,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3418,
                  "src": "2462:14:11",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:11"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1701,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1688,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2280:23:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1687,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:11",
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
                  "id": 1691,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2313:21:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1689,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1690,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:11",
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
                  "id": 1694,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2344:13:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1692,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:11",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1693,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:11",
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
                  "id": 1696,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2367:17:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1695,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:11",
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
                  "id": 1698,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2394:12:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1697,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:11",
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
                  "id": 1700,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2416:14:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1699,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:11"
            },
            "payable": false,
            "returnParameters": {
              "id": 1707,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1706,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1750,
                  "src": "2511:7:11",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1705,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:11",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:11"
            },
            "scope": 1751,
            "src": "2255:948:11",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1752,
        "src": "995:2210:11"
      }
    ],
    "src": "597:2609:11"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.339Z"
}