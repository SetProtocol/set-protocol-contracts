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
  "bytecode": "0x608060405234801561001057600080fd5b50610a9e806100206000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d41461009e5780631e912bd6146100f9578063430bf08a1461013e57806352904449146101955780638ca4daf914610282578063a003e069146102d9578063c19d93fb14610349578063f7213db6146103d3578063fef3ee7314610418575b600080fd5b3480156100aa57600080fd5b506100df600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610473565b604051808215151515815260200191505060405180910390f35b34801561010557600080fd5b5061012860048036038101908080356000191690602001909291905050506104cb565b6040518082815260200191505060405180910390f35b34801561014a57600080fd5b506101536104f2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a157600080fd5b50610240600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019082018035906020019190919293919293908035906020019082018035906020019190919293919293908035906020019092919080359060200190820180359060200191909192939192939080359060200190820180359060200191909192939192939050505061051e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561028e57600080fd5b50610297610930565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102e557600080fd5b50610307600480360381019080803560ff16906020019092919050505061095c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561035557600080fd5b5061035e6109a1565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156103df57600080fd5b5061040260048036038101908080356000191690602001909291905050506109f3565b6040518082815260200191505060405180910390f35b34801561042457600080fd5b50610459600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a1a565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000808b600060030160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602681526020017f466163746f72792069732064697361626c6564206f7220646f6573206e6f742081526020017f65786973742e0000000000000000000000000000000000000000000000000000815250901515610677576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561063c578082015181840152602081019050610621565b50505050905090810190601f1680156106695780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c73ffffffffffffffffffffffffffffffffffffffff1663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e82818152602001925060200280828437820191505085810384528c8c82818152602001925060200280828437820191505085810383528989828181526020019250808284378201915050858103825287878281815260200192508082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561077557600080fd5b505af1158015610789573d6000803e3d6000fd5b505050506040513d602081101561079f57600080fd5b810190808051906020019092919050505091506001600060040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001888152602001806020018060200185810385528e8e82818152602001925060200280828437820191505085810384528c8c82818152602001925060200280828437820191505085810383528989828181526020019250808284378201915050858103825287878281815260200192508082843782019150509e50505050505050505050505050505060405180910390a281925050509a9950505050505050505050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a7230582093423643a0a281e59095b437c750135c5ab6d4aed73aec7f0e5607d38609d4b10029",
  "deployedBytecode": "0x608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d41461009e5780631e912bd6146100f9578063430bf08a1461013e57806352904449146101955780638ca4daf914610282578063a003e069146102d9578063c19d93fb14610349578063f7213db6146103d3578063fef3ee7314610418575b600080fd5b3480156100aa57600080fd5b506100df600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610473565b604051808215151515815260200191505060405180910390f35b34801561010557600080fd5b5061012860048036038101908080356000191690602001909291905050506104cb565b6040518082815260200191505060405180910390f35b34801561014a57600080fd5b506101536104f2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a157600080fd5b50610240600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019082018035906020019190919293919293908035906020019082018035906020019190919293919293908035906020019092919080359060200190820180359060200191909192939192939080359060200190820180359060200191909192939192939050505061051e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561028e57600080fd5b50610297610930565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102e557600080fd5b50610307600480360381019080803560ff16906020019092919050505061095c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561035557600080fd5b5061035e6109a1565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156103df57600080fd5b5061040260048036038101908080356000191690602001909291905050506109f3565b6040518082815260200191505060405180910390f35b34801561042457600080fd5b50610459600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a1a565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000808b600060030160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602681526020017f466163746f72792069732064697361626c6564206f7220646f6573206e6f742081526020017f65786973742e0000000000000000000000000000000000000000000000000000815250901515610677576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561063c578082015181840152602081019050610621565b50505050905090810190601f1680156106695780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508c73ffffffffffffffffffffffffffffffffffffffff1663110a25c28d8d8d8d8d8d8d8d8d6040518a63ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001888152602001806020018060200185810385528e8e82818152602001925060200280828437820191505085810384528c8c82818152602001925060200280828437820191505085810383528989828181526020019250808284378201915050858103825287878281815260200192508082843782019150509d5050505050505050505050505050602060405180830381600087803b15801561077557600080fd5b505af1158015610789573d6000803e3d6000fd5b505050506040513d602081101561079f57600080fd5b810190808051906020019092919050505091506001600060040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff167f388b9bd51ec792eb7ce238581b3f844072709011b2a20260c428451e07d764a88e8e8e8e8e8e8e8e8e8e604051808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001888152602001806020018060200185810385528e8e82818152602001925060200280828437820191505085810384528c8c82818152602001925060200280828437820191505085810383528989828181526020019250808284378201915050858103825287878281815260200192508082843782019150509e50505050505050505050505050505060405180910390a281925050509a9950505050505050505050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a7230582093423643a0a281e59095b437c750135c5ab6d4aed73aec7f0e5607d38609d4b10029",
  "sourceMap": "995:2108:8:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;995:2108:8;;;;;;;",
  "deployedSourceMap": "995:2108:8:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2529:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;;;;;;;;;;;;;;;;;;;;2255:846:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2255:846:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1656:147:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2377:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2377:146:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2239:132:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;2169:4;2196:5;:20;;:30;2217:8;2196:30;;;;;;;;;;;;;;;;;;;;;;;;;2189:37;;2083:150;;;:::o;2529:::-;2615:4;2642:5;:18;;:30;2661:10;2642:30;;;;;;;;;;;;;;;;;;2635:37;;2529:150;;;:::o;1954:123::-;2022:7;2052:5;:18;;;;;;;;;;;;2045:25;;1954:123;:::o;2255:846:8:-;2511:7;2560:26;2477:15;1709:5:21;:20;;:37;1730:15;1709:37;;;;;;;;;;;;;;;;;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1688:97:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2601:15:8;2589:35;;;2638:11;;2663:6;;2683:12;2709:5;;2728:7;;2589:156;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2589:156:8;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2589:156:8;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;2589:156:8;;;;;;;;;;;;;;;;2560:185;;2841:4;2803:5;:15;;:35;2819:18;2803:35;;;;;;;;;;;;;;;;:42;;;;;;;;;;;;;;;;;;2890:18;2861:197;;;2922:15;2951:11;;2976:6;;2996:12;3022:5;;3041:7;;2861:197;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3076:18;3069:25;;2255:846;;;;;;;;;;;;;;:::o;1809:139:22:-;1885:7;1915:5;:26;;;;;;;;;;;;1908:33;;1809:139;:::o;1656:147::-;1738:7;1768:5;:15;;:28;1784:11;1768:28;;;;;;;;;;;;;;;;;;;;;;;;;1761:35;;1656:147;;;:::o;1579:18::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;2377:146::-;2461:4;2488:5;:16;;:28;2505:10;2488:28;;;;;;;;;;;;;;;;;;2481:35;;2377:146;;;:::o;2239:132::-;2316:4;2343:5;:15;;:21;2359:4;2343:21;;;;;;;;;;;;;;;;;;;;;;;;;2336:28;;2239:132;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ISetFactory } from \"../interfaces/ISetFactory.sol\";\n\n\n/**\n * @title Core Factory\n * @author Set Protocol\n *\n * The CoreCreate contract contains public set token operations\n */\ncontract CoreFactory is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant INVALID_FACTORY = \"Factory is disabled or does not exist.\";\n\n    /* ============ Events ============ */\n\n    event SetTokenCreated(\n        address indexed _setTokenAddress,\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    );\n\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deploys a new Set Token and adds it to the valid list of SetTokens\n     *\n     * @param  _factoryAddress  address       The address of the Factory to create from\n     * @param  _components      address[]     The address of component tokens\n     * @param  _units           uint[]        The units of each component token\n     * @param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n     * @param  _name            string        The name of the new Set\n     * @param  _symbol          string        The symbol of the new Set\n     * @return setTokenAddress address        The address of the new Set\n     */\n    function create(\n        address _factoryAddress,\n        address[] _components,\n        uint[] _units,\n        uint _naturalUnit,\n        string _name,\n        string _symbol\n    )\n        external\n        isValidFactory(_factoryAddress)\n        returns (address)\n    {\n        // Create the Set\n        address newSetTokenAddress = ISetFactory(_factoryAddress).create(\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        // Add Set to the list of tracked Sets\n        state.validSets[newSetTokenAddress] = true;\n\n        emit SetTokenCreated(\n            newSetTokenAddress,\n            _factoryAddress,\n            _components,\n            _units,\n            _naturalUnit,\n            _name,\n            _symbol\n        );\n\n        return newSetTokenAddress;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1262
      ]
    },
    "id": 1263,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1169,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1171,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 4739,
        "src": "622:73:8",
        "symbolAliases": [
          {
            "foreign": 1170,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1173,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2639,
        "src": "696:63:8",
        "symbolAliases": [
          {
            "foreign": 1172,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1175,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2752,
        "src": "760:49:8",
        "symbolAliases": [
          {
            "foreign": 1174,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1177,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2471,
        "src": "810:60:8",
        "symbolAliases": [
          {
            "foreign": 1176,
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
              "id": 1178,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1023:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1179,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1180,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1038:13:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1181,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:8"
          }
        ],
        "contractDependencies": [
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1262,
        "linearizedBaseContracts": [
          1262,
          2638,
          2751
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1184,
            "libraryName": {
              "contractScope": null,
              "id": 1182,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1119:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:8",
            "typeName": {
              "id": 1183,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1187,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1262,
            "src": "1193:74:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1185,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1186,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:8",
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
            "id": 1205,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1204,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1189,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1349:32:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1188,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:8",
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
                  "id": 1191,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1391:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1190,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:8",
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
                  "id": 1194,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1424:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1192,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1193,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:8",
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
                  "id": 1197,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1455:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1195,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1196,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:8",
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
                  "id": 1199,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1478:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1198,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:8",
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
                  "id": 1201,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1505:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1200,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:8",
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
                  "id": 1203,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1527:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1202,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:8"
            },
            "src": "1318:230:8"
          },
          {
            "body": {
              "id": 1260,
              "nodeType": "Block",
              "src": "2524:577:8",
              "statements": [
                {
                  "assignments": [
                    1228
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1228,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1261,
                      "src": "2560:26:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1227,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1239,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1233,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1210,
                        "src": "2638:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1234,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "2663:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1235,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1215,
                        "src": "2683:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1236,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1217,
                        "src": "2709:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1237,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1219,
                        "src": "2728:7:8",
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
                            "id": 1230,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1207,
                            "src": "2601:15:8",
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
                          "id": 1229,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2470,
                          "src": "2589:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2470_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1231,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2470",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1232,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2469,
                      "src": "2589:35:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1238,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1246,
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
                          "id": 1240,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2803:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1243,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2656,
                        "src": "2803:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1244,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1242,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1228,
                        "src": "2819:18:8",
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
                      "src": "2803:35:8",
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
                      "id": 1245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2841:4:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2803:42:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1247,
                  "nodeType": "ExpressionStatement",
                  "src": "2803:42:8"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1249,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1228,
                        "src": "2890:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1250,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1207,
                        "src": "2922:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1251,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1210,
                        "src": "2951:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1252,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "2976:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1253,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1215,
                        "src": "2996:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1254,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1217,
                        "src": "3022:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1255,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1219,
                        "src": "3041:7:8",
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
                      "id": 1248,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1205,
                      "src": "2861:15:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1256,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2861:197:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1257,
                  "nodeType": "EmitStatement",
                  "src": "2856:202:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1258,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1228,
                    "src": "3076:18:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1226,
                  "id": 1259,
                  "nodeType": "Return",
                  "src": "3069:25:8"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1261,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1222,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1207,
                    "src": "2477:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1223,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1221,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2602,
                  "src": "2462:14:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:8"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1220,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1207,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2280:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1206,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:8",
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
                  "id": 1210,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2313:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1208,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1209,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:8",
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
                  "id": 1213,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2344:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1211,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1212,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:8",
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
                  "id": 1215,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2367:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1214,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:8",
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
                  "id": 1217,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2394:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1216,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:8",
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
                  "id": 1219,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2416:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1218,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1226,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1225,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2511:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1224,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:8"
            },
            "scope": 1262,
            "src": "2255:846:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1263,
        "src": "995:2108:8"
      }
    ],
    "src": "597:2507:8"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreFactory.sol",
    "exportedSymbols": {
      "CoreFactory": [
        1262
      ]
    },
    "id": 1263,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1169,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1171,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 4739,
        "src": "622:73:8",
        "symbolAliases": [
          {
            "foreign": 1170,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1173,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2639,
        "src": "696:63:8",
        "symbolAliases": [
          {
            "foreign": 1172,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1175,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2752,
        "src": "760:49:8",
        "symbolAliases": [
          {
            "foreign": 1174,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ISetFactory.sol",
        "file": "../interfaces/ISetFactory.sol",
        "id": 1177,
        "nodeType": "ImportDirective",
        "scope": 1263,
        "sourceUnit": 2471,
        "src": "810:60:8",
        "symbolAliases": [
          {
            "foreign": 1176,
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
              "id": 1178,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1023:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1179,
            "nodeType": "InheritanceSpecifier",
            "src": "1023:9:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1180,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1038:13:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1181,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:13:8"
          }
        ],
        "contractDependencies": [
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Factory\n@author Set Protocol\n * The CoreCreate contract contains public set token operations",
        "fullyImplemented": true,
        "id": 1262,
        "linearizedBaseContracts": [
          1262,
          2638,
          2751
        ],
        "name": "CoreFactory",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1184,
            "libraryName": {
              "contractScope": null,
              "id": 1182,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1119:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1113:27:8",
            "typeName": {
              "id": 1183,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1132:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1187,
            "name": "INVALID_FACTORY",
            "nodeType": "VariableDeclaration",
            "scope": 1262,
            "src": "1193:74:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1185,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1193:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "466163746f72792069732064697361626c6564206f7220646f6573206e6f742065786973742e",
              "id": 1186,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1227:40:8",
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
            "id": 1205,
            "name": "SetTokenCreated",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 1204,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1189,
                  "indexed": true,
                  "name": "_setTokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1349:32:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1188,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1349:7:8",
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
                  "id": 1191,
                  "indexed": false,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1391:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1190,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1391:7:8",
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
                  "id": 1194,
                  "indexed": false,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1424:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1192,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1424:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1193,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1424:9:8",
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
                  "id": 1197,
                  "indexed": false,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1455:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1195,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1455:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1196,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1455:6:8",
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
                  "id": 1199,
                  "indexed": false,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1478:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1198,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1478:4:8",
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
                  "id": 1201,
                  "indexed": false,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1505:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1200,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1505:6:8",
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
                  "id": 1203,
                  "indexed": false,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1205,
                  "src": "1527:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1202,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "1527:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1339:208:8"
            },
            "src": "1318:230:8"
          },
          {
            "body": {
              "id": 1260,
              "nodeType": "Block",
              "src": "2524:577:8",
              "statements": [
                {
                  "assignments": [
                    1228
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1228,
                      "name": "newSetTokenAddress",
                      "nodeType": "VariableDeclaration",
                      "scope": 1261,
                      "src": "2560:26:8",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      },
                      "typeName": {
                        "id": 1227,
                        "name": "address",
                        "nodeType": "ElementaryTypeName",
                        "src": "2560:7:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1239,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1233,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1210,
                        "src": "2638:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1234,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "2663:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1235,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1215,
                        "src": "2683:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1236,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1217,
                        "src": "2709:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1237,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1219,
                        "src": "2728:7:8",
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
                            "id": 1230,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1207,
                            "src": "2601:15:8",
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
                          "id": 1229,
                          "name": "ISetFactory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2470,
                          "src": "2589:11:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ISetFactory_$2470_$",
                            "typeString": "type(contract ISetFactory)"
                          }
                        },
                        "id": 1231,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "2589:28:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ISetFactory_$2470",
                          "typeString": "contract ISetFactory"
                        }
                      },
                      "id": 1232,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "create",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2469,
                      "src": "2589:35:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$_t_address_$",
                        "typeString": "function (address[] memory,uint256[] memory,uint256,string memory,string memory) external returns (address)"
                      }
                    },
                    "id": 1238,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2589:156:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2560:185:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1246,
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
                          "id": 1240,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2803:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1243,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2656,
                        "src": "2803:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1244,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1242,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1228,
                        "src": "2819:18:8",
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
                      "src": "2803:35:8",
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
                      "id": 1245,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2841:4:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2803:42:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1247,
                  "nodeType": "ExpressionStatement",
                  "src": "2803:42:8"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1249,
                        "name": "newSetTokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1228,
                        "src": "2890:18:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1250,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1207,
                        "src": "2922:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1251,
                        "name": "_components",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1210,
                        "src": "2951:11:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1252,
                        "name": "_units",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "2976:6:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1253,
                        "name": "_naturalUnit",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1215,
                        "src": "2996:12:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1254,
                        "name": "_name",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1217,
                        "src": "3022:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_calldata_ptr",
                          "typeString": "string calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1255,
                        "name": "_symbol",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1219,
                        "src": "3041:7:8",
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
                      "id": 1248,
                      "name": "SetTokenCreated",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1205,
                      "src": "2861:15:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$_t_uint256_$_t_string_memory_ptr_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory,uint256,string memory,string memory)"
                      }
                    },
                    "id": 1256,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2861:197:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1257,
                  "nodeType": "EmitStatement",
                  "src": "2856:202:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1258,
                    "name": "newSetTokenAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1228,
                    "src": "3076:18:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "functionReturnParameters": 1226,
                  "id": 1259,
                  "nodeType": "Return",
                  "src": "3069:25:8"
                }
              ]
            },
            "documentation": "Deploys a new Set Token and adds it to the valid list of SetTokens\n     * @param  _factoryAddress  address       The address of the Factory to create from\n@param  _components      address[]     The address of component tokens\n@param  _units           uint[]        The units of each component token\n@param  _naturalUnit     uint          The minimum unit to be issued or redeemed\n@param  _name            string        The name of the new Set\n@param  _symbol          string        The symbol of the new Set\n@return setTokenAddress address        The address of the new Set",
            "id": 1261,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1222,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1207,
                    "src": "2477:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1223,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1221,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2602,
                  "src": "2462:14:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2462:31:8"
              }
            ],
            "name": "create",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1220,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1207,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2280:23:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1206,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2280:7:8",
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
                  "id": 1210,
                  "name": "_components",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2313:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1208,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2313:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1209,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2313:9:8",
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
                  "id": 1213,
                  "name": "_units",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2344:13:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1211,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2344:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1212,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2344:6:8",
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
                  "id": 1215,
                  "name": "_naturalUnit",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2367:17:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1214,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "2367:4:8",
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
                  "id": 1217,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2394:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1216,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2394:6:8",
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
                  "id": 1219,
                  "name": "_symbol",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2416:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_calldata_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 1218,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "2416:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2270:166:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1226,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1225,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 1261,
                  "src": "2511:7:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1224,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2511:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2510:9:8"
            },
            "scope": 1262,
            "src": "2255:846:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1263,
        "src": "995:2108:8"
      }
    ],
    "src": "597:2507:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.896Z"
}