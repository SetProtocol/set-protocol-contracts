export const CoreAccounting = 
{
  "contractName": "CoreAccounting",
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
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokens",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchDeposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokens",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchWithdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50610884806100206000396000f3006080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd61461010957806330a907361461013357806347e7ef2414610161578063559ed339146101855780636e667db3146101ea578063a003e0691461021b578063c19d93fb14610236578063e131243e14610271578063f3fef3a31461029d578063f7213db6146102c1578063fbfa77cf146102d9578063fe5b38e4146102ee578063fef3ee7314610303575b600080fd5b3480156100e057600080fd5b506100f5600160a060020a0360043516610324565b604080519115158252519081900360200190f35b34801561011557600080fd5b50610121600435610342565b60408051918252519081900360200190f35b34801561013f57600080fd5b5061015f6024600480358281019290820135918135918201910135610354565b005b34801561016d57600080fd5b5061015f600160a060020a03600435166024356103bd565b34801561019157600080fd5b5061019a6103cd565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d65781810151838201526020016101be565b505050509050019250505060405180910390f35b3480156101f657600080fd5b506101ff610432565b60408051600160a060020a039092168252519081900360200190f35b34801561022757600080fd5b506101ff60ff60043516610441565b34801561024257600080fd5b5061024b61045f565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561027d57600080fd5b5061015f6024600480358281019290820135918135918201910135610475565b3480156102a957600080fd5b5061015f600160a060020a03600435166024356104f0565b3480156102cd57600080fd5b5061012160043561060d565b3480156102e557600080fd5b506101ff61061f565b3480156102fa57600080fd5b5061019a61062e565b34801561030f57600080fd5b506100f5600160a060020a0360043516610691565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b6103b733338686808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808c0282810182019093528b82529095508b94508a9350839250850190849080828437506106af945050505050565b50505050565b6103c93333848461072b565b5050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561042857602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161040a575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b600080841161048357600080fd5b6000821161049057600080fd5b83821461049c57600080fd5b5060005b838110156104e9576104e18585838181106104b757fe5b90506020020135600160a060020a031684848481811015156104d557fe5b905060200201356104f0565b6001016104a0565b5050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a038581166024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561056757600080fd5b505af115801561057b573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b1580156105f057600080fd5b505af1158015610604573d6000803e3d6000fd5b50505050505050565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561042857602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161040a575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b60008083511115156106c057600080fd5b81516000106106ce57600080fd5b81518351146106dc57600080fd5b5060005b82518110156104e957610723858585848151811015156106fc57fe5b90602001906020020151858581518110151561071457fe5b9060200190602002015161072b565b6001016106e0565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156107ac57600080fd5b505af11580156107c0573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038881166004830152878116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b15801561083a57600080fd5b505af115801561084e573d6000803e3d6000fd5b50505050505050505600a165627a7a7230582071f8d1cde36e844342c27ad7107fa8379b960b7585639b14342c153c78e519d00029",
  "deployedBytecode": "0x6080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd61461010957806330a907361461013357806347e7ef2414610161578063559ed339146101855780636e667db3146101ea578063a003e0691461021b578063c19d93fb14610236578063e131243e14610271578063f3fef3a31461029d578063f7213db6146102c1578063fbfa77cf146102d9578063fe5b38e4146102ee578063fef3ee7314610303575b600080fd5b3480156100e057600080fd5b506100f5600160a060020a0360043516610324565b604080519115158252519081900360200190f35b34801561011557600080fd5b50610121600435610342565b60408051918252519081900360200190f35b34801561013f57600080fd5b5061015f6024600480358281019290820135918135918201910135610354565b005b34801561016d57600080fd5b5061015f600160a060020a03600435166024356103bd565b34801561019157600080fd5b5061019a6103cd565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101d65781810151838201526020016101be565b505050509050019250505060405180910390f35b3480156101f657600080fd5b506101ff610432565b60408051600160a060020a039092168252519081900360200190f35b34801561022757600080fd5b506101ff60ff60043516610441565b34801561024257600080fd5b5061024b61045f565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561027d57600080fd5b5061015f6024600480358281019290820135918135918201910135610475565b3480156102a957600080fd5b5061015f600160a060020a03600435166024356104f0565b3480156102cd57600080fd5b5061012160043561060d565b3480156102e557600080fd5b506101ff61061f565b3480156102fa57600080fd5b5061019a61062e565b34801561030f57600080fd5b506100f5600160a060020a0360043516610691565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b6103b733338686808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808c0282810182019093528b82529095508b94508a9350839250850190849080828437506106af945050505050565b50505050565b6103c93333848461072b565b5050565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561042857602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161040a575b5050505050905090565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b600080841161048357600080fd5b6000821161049057600080fd5b83821461049c57600080fd5b5060005b838110156104e9576104e18585838181106104b757fe5b90506020020135600160a060020a031684848481811015156104d557fe5b905060200201356104f0565b6001016104a0565b5050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a038581166024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561056757600080fd5b505af115801561057b573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b1580156105f057600080fd5b505af1158015610604573d6000803e3d6000fd5b50505050505050565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561042857602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161040a575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b60008083511115156106c057600080fd5b81516000106106ce57600080fd5b81518351146106dc57600080fd5b5060005b82518110156104e957610723858585848151811015156106fc57fe5b90602001906020020151858581518110151561071457fe5b9060200190602002015161072b565b6001016106e0565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156107ac57600080fd5b505af11580156107c0573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038881166004830152878116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b15801561083a57600080fd5b505af115801561084e573d6000803e3d6000fd5b50505050505050505600a165627a7a7230582071f8d1cde36e844342c27ad7107fa8379b960b7585639b14342c153c78e519d00029",
  "sourceMap": "1049:5163:3:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1049:5163:3;;;;;;;",
  "deployedSourceMap": "1049:5163:3:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:16;-1:-1:-1;;;;;2803:164:16;;;;;;;;;;;;;;;;;;;;;;;4376;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:16;;;;;;;;;;;;;;;;;;;;;2810:293:3;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2810:293:3;;;;;;;;;;;;;;;;;;;;;;;;;;1468:267;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1468:267:3;-1:-1:-1;;;;;1468:267:3;;;;;;;3685:119:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:16;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:16;;;;;;;;-1:-1:-1;;;;;2263:125:16;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:16;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:16;;;;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;;;;;;;;;;;;;;;;;;;3422:654:3;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3422:654:3;;;;;;;;;;;;;;;;;;;;;;;;1945:528;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1945:528:3;-1:-1:-1;;;;;1945:528:3;;;;;;;4008:160:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:16;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:16;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:16;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:16;-1:-1:-1;;;;;3409:146:16;;;;;2803:164;-1:-1:-1;;;;;2930:30:16;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4376:::-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;2810:293:3:-;2972:124;3006:10;3030;3054:7;;2972:124;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;2972:124:3;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3075:11:3;;-1:-1:-1;3075:11:3;;-1:-1:-1;3075:11:3;;-1:-1:-1;2972:124:3;;;3075:11;;2972:124;3075:11;2972:124;;-1:-1:-1;2972:20:3;;-1:-1:-1;;;;;2972:124:3:i;:::-;2810:293;;;;:::o;1468:267::-;1612:116;1641:10;1665;1689:6;1709:9;1612:15;:116::i;:::-;1468:267;;:::o;3685:119:16:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:16;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:16;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:16;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:16;;;;;;:::o;3422:654:3:-;3926:6;3601:18;;;3593:27;;;;;;3720:1;3699:22;;3691:31;;;;;;3806:36;;;3798:45;;;;;;-1:-1:-1;3935:1:3;3921:149;3938:18;;;3921:149;;;3977:82;4003:7;;4011:1;4003:10;;;;;;;;;;;;;-1:-1:-1;;;;;4003:10:3;4031:11;;4043:1;4031:14;;;;;;;;;;;;;;;3977:8;:82::i;:::-;3958:3;;3921:149;;;3422:654;;;;;:::o;1945:528::-;2116:11;;2200:102;;;;;;2239:10;2200:102;;;;-1:-1:-1;;;;;2200:102:3;;;;;;;;;;;;;;;2116:11;;;;;;;2200:25;;:102;;;;;2094:12;;2200:102;;;;;;;;2094:12;2116:11;2200:102;;;5:2:-1;;;;30:1;27;20:12;5:2;2200:102:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;2373:93:3;;;;;;-1:-1:-1;;;;;2373:93:3;;;;;;;2423:10;2373:93;;;;;;;;;;;;:16;;;;-1:-1:-1;2373:16:3;;-1:-1:-1;2373:93:3;;;;;-1:-1:-1;;2373:93:3;;;;;;;;-1:-1:-1;2373:16:3;:93;;;5:2:-1;;;;30:1;27;20:12;5:2;2373:93:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2373:93:3;;;;1945:528;;;:::o;4008:160:16:-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:16;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:16;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:16;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;5446:764:3:-;6009:6;5694:1;5677:7;:14;:18;5669:27;;;;;;;;5775:18;;5796:1;-1:-1:-1;5767:31:3;;;;;;5900:18;;5882:14;;:36;5874:45;;;;;;-1:-1:-1;6018:1:3;6004:200;6025:7;:14;6021:1;:18;6004:200;;;6060:133;6093:5;6116:3;6137:7;6145:1;6137:10;;;;;;;;;;;;;;;;;;6165:11;6177:1;6165:14;;;;;;;;;;;;;;;;;;6060:15;:133::i;:::-;6041:3;;6004:200;;4463:563;4704:19;;4809:11;;4689:141;;;;;;-1:-1:-1;;;;;4689:141:3;;;;;;;;;;;;;;;;;;;;4809:11;;;4689:141;;;;;;4704:19;;;;;4689:44;;:141;;;;;4704:5;;4689:141;;;;;;;4704:5;:19;4689:141;;;5:2:-1;;;;30:1;27;20:12;5:2;4689:141:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;4917:11:3;;4910:109;;;;;;-1:-1:-1;;;;;4910:109:3;;;;;;;;;;;;;;;;;;;;;;4917:11;;;;;-1:-1:-1;4910:39:3;;-1:-1:-1;4910:109:3;;;;;4917:5;;4910:109;;;;;;;4917:5;:11;4910:109;;;5:2:-1;;;;30:1;27;20:12;5:2;4910:109:3;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;4910:109:3;;;;4463:563;;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault and attribute to sender.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint _quantity\n    )\n        external\n    {\n        // Call internal deposit function\n        depositInternal(\n            msg.sender,\n            msg.sender,\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint _quantity\n    )\n        public\n    {\n        // Declare interface variavle for vault\n        IVault vault = IVault(state.vault);\n\n        // Call Vault contract to deattribute tokens to user\n        vault.decrementTokenOwner(\n            msg.sender,\n            _token,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        vault.withdrawTo(\n            _token,\n            msg.sender,\n            _quantity\n        );\n    }\n\n    /**\n     * Deposit multiple tokens to the vault and attribute to sender.\n     * Quantities should be in the order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint[] _quantities\n    )\n        external\n    {\n        // Call internal batch deposit function\n        batchDepositInternal(\n            msg.sender,\n            msg.sender,\n            _tokens,\n            _quantities\n        );\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint[] _quantities\n    )\n        external\n    {\n        // Confirm an empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run withdraw function\n        for (uint i = 0; i < _tokens.length; i++) {\n            withdraw(\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _from            Address depositing token\n     * @param  _to              Address to credit for deposit\n     * @param  _token           Address of token being deposited\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function depositInternal(\n        address _from,\n        address _to,\n        address _token,\n        uint _quantity\n    )\n        internal\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxy).transfer(\n            _token,\n            _quantity,\n            _from,\n            state.vault\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vault).incrementTokenOwner(\n            _to,\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _from            Address depositing tokens\n     * @param  _to              Address to credit for deposits\n     * @param  _tokens          Addresses of tokens being deposited\n     * @param  _quantities      The quantities of tokens to deposit\n     */\n    function batchDepositInternal(\n        address _from,\n        address _to,\n        address[] _tokens,\n        uint[] _quantities\n    )\n        internal\n    {\n        // Confirm and empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run depositInternal function\n        for (uint i = 0; i < _tokens.length; i++) {\n            depositInternal(\n                _from,\n                _to,\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        791
      ]
    },
    "id": 792,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 560,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:3"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 562,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 3894,
        "src": "622:73:3",
        "symbolAliases": [
          {
            "foreign": 561,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 564,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2747,
        "src": "696:49:3",
        "symbolAliases": [
          {
            "foreign": 563,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 566,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2569,
        "src": "746:66:3",
        "symbolAliases": [
          {
            "foreign": 565,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 568,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2608,
        "src": "813:50:3",
        "symbolAliases": [
          {
            "foreign": 567,
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
              "id": 569,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2746,
              "src": "1080:9:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2746",
                "typeString": "contract CoreState"
              }
            },
            "id": 570,
            "nodeType": "InheritanceSpecifier",
            "src": "1080:9:3"
          }
        ],
        "contractDependencies": [
          2746
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 791,
        "linearizedBaseContracts": [
          791,
          2746
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 573,
            "libraryName": {
              "contractScope": null,
              "id": 571,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1157:8:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1151:27:3",
            "typeName": {
              "id": 572,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1170:7:3",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 589,
              "nodeType": "Block",
              "src": "1560:175:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 581,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "1641:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1641:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 583,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "1665:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 584,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1665:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 585,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 575,
                        "src": "1689:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 586,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 577,
                        "src": "1709:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 580,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 730,
                      "src": "1612:15:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1612:116:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 588,
                  "nodeType": "ExpressionStatement",
                  "src": "1612:116:3"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 590,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 575,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 590,
                  "src": "1494:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 574,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1494:7:3",
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
                  "id": 577,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 590,
                  "src": "1518:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 576,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1518:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1484:54:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 579,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1560:0:3"
            },
            "scope": 791,
            "src": "1468:267:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 622,
              "nodeType": "Block",
              "src": "2036:437:3",
              "statements": [
                {
                  "assignments": [
                    598
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 598,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 623,
                      "src": "2094:12:3",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$2607",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 597,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2607,
                        "src": "2094:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 603,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 600,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2116:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 601,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2617,
                        "src": "2116:11:3",
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
                      "id": 599,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2607,
                      "src": "2109:6:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$2607_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 602,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2109:19:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$2607",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2094:34:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 607,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "2239:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 608,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2239:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 609,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 592,
                        "src": "2263:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 610,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 594,
                        "src": "2283:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 604,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 598,
                        "src": "2200:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 606,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2597,
                      "src": "2200:25:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 611,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2200:102:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 612,
                  "nodeType": "ExpressionStatement",
                  "src": "2200:102:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 616,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 592,
                        "src": "2403:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 617,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "2423:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 618,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2423:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 619,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 594,
                        "src": "2447:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 613,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 598,
                        "src": "2373:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 615,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2579,
                      "src": "2373:16:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 620,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2373:93:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 621,
                  "nodeType": "ExpressionStatement",
                  "src": "2373:93:3"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 623,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 592,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 623,
                  "src": "1972:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1972:7:3",
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
                  "id": 594,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 623,
                  "src": "1996:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1996:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1962:54:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 596,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2036:0:3"
            },
            "scope": 791,
            "src": "1945:528:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 641,
              "nodeType": "Block",
              "src": "2914:189:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 633,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "3006:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 634,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3006:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 635,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "3030:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 636,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3030:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 637,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "3054:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 638,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 629,
                        "src": "3075:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
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
                        }
                      ],
                      "id": 632,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 790,
                      "src": "2972:20:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 639,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2972:124:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 640,
                  "nodeType": "ExpressionStatement",
                  "src": "2972:124:3"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 642,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 630,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 626,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 642,
                  "src": "2841:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 624,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2841:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 625,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2841:9:3",
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
                  "id": 629,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 642,
                  "src": "2868:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 627,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2868:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 628,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2868:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2831:61:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 631,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2914:0:3"
            },
            "scope": 791,
            "src": "2810:293:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 695,
              "nodeType": "Block",
              "src": "3527:549:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 655,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 652,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 645,
                            "src": "3601:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 653,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3601:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 654,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3618:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3601:18:3",
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
                      "id": 651,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3593:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 656,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3593:27:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 657,
                  "nodeType": "ExpressionStatement",
                  "src": "3593:27:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 662,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 659,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 648,
                            "src": "3699:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 660,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3699:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 661,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3720:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3699:22:3",
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
                      "id": 658,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3691:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 663,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3691:31:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 664,
                  "nodeType": "ExpressionStatement",
                  "src": "3691:31:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 670,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 666,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 645,
                            "src": "3806:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 667,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3806:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 668,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 648,
                            "src": "3824:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 669,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3824:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3806:36:3",
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
                      "id": 665,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3798:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 671,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3798:45:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 672,
                  "nodeType": "ExpressionStatement",
                  "src": "3798:45:3"
                },
                {
                  "body": {
                    "id": 693,
                    "nodeType": "Block",
                    "src": "3963:107:3",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 685,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 645,
                                "src": "4003:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 687,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 686,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 674,
                                "src": "4011:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "4003:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 688,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 648,
                                "src": "4031:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 690,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 689,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 674,
                                "src": "4043:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "4031:14:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 684,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 623,
                            "src": "3977:8:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 691,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3977:82:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 692,
                        "nodeType": "ExpressionStatement",
                        "src": "3977:82:3"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 680,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 677,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 674,
                      "src": "3938:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 678,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 645,
                        "src": "3942:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 679,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3942:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3938:18:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 694,
                  "initializationExpression": {
                    "assignments": [
                      674
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 674,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 696,
                        "src": "3926:6:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 673,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3926:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 676,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 675,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3935:1:3",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3926:10:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 682,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3958:3:3",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 681,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 674,
                        "src": "3958:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 683,
                    "nodeType": "ExpressionStatement",
                    "src": "3958:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "3921:149:3"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 696,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 649,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 645,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 696,
                  "src": "3454:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 643,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3454:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 644,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3454:9:3",
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
                  "id": 648,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 696,
                  "src": "3481:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 646,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3481:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 647,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3481:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3444:61:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 650,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:3"
            },
            "scope": 791,
            "src": "3422:654:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 729,
              "nodeType": "Block",
              "src": "4607:419:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 712,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 702,
                        "src": "4747:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 713,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 704,
                        "src": "4767:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 714,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 698,
                        "src": "4790:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 715,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "4809:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 716,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2617,
                        "src": "4809:11:3",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 708,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2642,
                              "src": "4704:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2640_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 709,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2615,
                            "src": "4704:19:3",
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
                          "id": 707,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2568,
                          "src": "4689:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2568_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 710,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4689:35:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2568",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 711,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2567,
                      "src": "4689:44:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 717,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4689:141:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 718,
                  "nodeType": "ExpressionStatement",
                  "src": "4689:141:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 724,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 700,
                        "src": "4963:3:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 725,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 702,
                        "src": "4980:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 726,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 704,
                        "src": "5000:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 720,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2642,
                              "src": "4917:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2640_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 721,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2617,
                            "src": "4917:11:3",
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
                          "id": 719,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "4910:6:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2607_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 722,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4910:19:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 723,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2588,
                      "src": "4910:39:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 727,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4910:109:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 728,
                  "nodeType": "ExpressionStatement",
                  "src": "4910:109:3"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 730,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 705,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 698,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4497:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4497:7:3",
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
                  "id": 700,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4520:11:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 699,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4520:7:3",
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
                  "id": 702,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4541:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 701,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4541:7:3",
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
                  "id": 704,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4565:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 703,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4565:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4487:98:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 706,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4607:0:3"
            },
            "scope": 791,
            "src": "4463:563:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 789,
              "nodeType": "Block",
              "src": "5602:608:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 747,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 744,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 737,
                            "src": "5677:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 745,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5677:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 746,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5694:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5677:18:3",
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
                      "id": 743,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5669:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 748,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5669:27:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 749,
                  "nodeType": "ExpressionStatement",
                  "src": "5669:27:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 754,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 751,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 740,
                            "src": "5775:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 752,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5775:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 753,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5796:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5775:22:3",
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
                      "id": 750,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5767:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 755,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5767:31:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 756,
                  "nodeType": "ExpressionStatement",
                  "src": "5767:31:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 762,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 758,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 737,
                            "src": "5882:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 759,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5882:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 760,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 740,
                            "src": "5900:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 761,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5900:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "5882:36:3",
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
                      "id": 757,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5874:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 763,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5874:45:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 764,
                  "nodeType": "ExpressionStatement",
                  "src": "5874:45:3"
                },
                {
                  "body": {
                    "id": 787,
                    "nodeType": "Block",
                    "src": "6046:158:3",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 777,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 732,
                              "src": "6093:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 778,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 734,
                              "src": "6116:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 779,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 737,
                                "src": "6137:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 781,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 780,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 766,
                                "src": "6145:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "6137:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 782,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 740,
                                "src": "6165:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 784,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 783,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 766,
                                "src": "6177:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "6165:14:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
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
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 776,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 730,
                            "src": "6060:15:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
                            }
                          },
                          "id": 785,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6060:133:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 786,
                        "nodeType": "ExpressionStatement",
                        "src": "6060:133:3"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 772,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 769,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 766,
                      "src": "6021:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 770,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 737,
                        "src": "6025:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 771,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "6025:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6021:18:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 788,
                  "initializationExpression": {
                    "assignments": [
                      766
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 766,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 790,
                        "src": "6009:6:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 765,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "6009:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 768,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 767,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6018:1:3",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "6009:10:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 774,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "6041:3:3",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 773,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 766,
                        "src": "6041:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 775,
                    "nodeType": "ExpressionStatement",
                    "src": "6041:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "6004:200:3"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 790,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 732,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5485:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 731,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5485:7:3",
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
                  "id": 734,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5508:11:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 733,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5508:7:3",
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
                  "id": 737,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5529:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 735,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5529:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 736,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5529:9:3",
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
                  "id": 740,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5556:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 738,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5556:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 739,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5556:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5475:105:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 742,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5602:0:3"
            },
            "scope": 791,
            "src": "5446:764:3",
            "stateMutability": "nonpayable",
            "superFunction": 2464,
            "visibility": "internal"
          }
        ],
        "scope": 792,
        "src": "1049:5163:3"
      }
    ],
    "src": "597:5616:3"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        791
      ]
    },
    "id": 792,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 560,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:3"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 562,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 3894,
        "src": "622:73:3",
        "symbolAliases": [
          {
            "foreign": 561,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 564,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2747,
        "src": "696:49:3",
        "symbolAliases": [
          {
            "foreign": 563,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 566,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2569,
        "src": "746:66:3",
        "symbolAliases": [
          {
            "foreign": 565,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 568,
        "nodeType": "ImportDirective",
        "scope": 792,
        "sourceUnit": 2608,
        "src": "813:50:3",
        "symbolAliases": [
          {
            "foreign": 567,
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
              "id": 569,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2746,
              "src": "1080:9:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2746",
                "typeString": "contract CoreState"
              }
            },
            "id": 570,
            "nodeType": "InheritanceSpecifier",
            "src": "1080:9:3"
          }
        ],
        "contractDependencies": [
          2746
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 791,
        "linearizedBaseContracts": [
          791,
          2746
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 573,
            "libraryName": {
              "contractScope": null,
              "id": 571,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3893,
              "src": "1157:8:3",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$3893",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1151:27:3",
            "typeName": {
              "id": 572,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1170:7:3",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 589,
              "nodeType": "Block",
              "src": "1560:175:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 581,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "1641:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 582,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1641:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 583,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "1665:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 584,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1665:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 585,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 575,
                        "src": "1689:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 586,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 577,
                        "src": "1709:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 580,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 730,
                      "src": "1612:15:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1612:116:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 588,
                  "nodeType": "ExpressionStatement",
                  "src": "1612:116:3"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 590,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 578,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 575,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 590,
                  "src": "1494:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 574,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1494:7:3",
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
                  "id": 577,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 590,
                  "src": "1518:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 576,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1518:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1484:54:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 579,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1560:0:3"
            },
            "scope": 791,
            "src": "1468:267:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 622,
              "nodeType": "Block",
              "src": "2036:437:3",
              "statements": [
                {
                  "assignments": [
                    598
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 598,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 623,
                      "src": "2094:12:3",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$2607",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 597,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 2607,
                        "src": "2094:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 603,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 600,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "2116:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 601,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2617,
                        "src": "2116:11:3",
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
                      "id": 599,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 2607,
                      "src": "2109:6:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$2607_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 602,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2109:19:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$2607",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2094:34:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 607,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "2239:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 608,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2239:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 609,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 592,
                        "src": "2263:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 610,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 594,
                        "src": "2283:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 604,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 598,
                        "src": "2200:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 606,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2597,
                      "src": "2200:25:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 611,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2200:102:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 612,
                  "nodeType": "ExpressionStatement",
                  "src": "2200:102:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 616,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 592,
                        "src": "2403:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 617,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "2423:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 618,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2423:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 619,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 594,
                        "src": "2447:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 613,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 598,
                        "src": "2373:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 615,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2579,
                      "src": "2373:16:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 620,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2373:93:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 621,
                  "nodeType": "ExpressionStatement",
                  "src": "2373:93:3"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 623,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 595,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 592,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 623,
                  "src": "1972:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 591,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1972:7:3",
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
                  "id": 594,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 623,
                  "src": "1996:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 593,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1996:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1962:54:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 596,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2036:0:3"
            },
            "scope": 791,
            "src": "1945:528:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 641,
              "nodeType": "Block",
              "src": "2914:189:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 633,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "3006:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 634,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3006:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 635,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3994,
                          "src": "3030:3:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 636,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3030:10:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 637,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "3054:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 638,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 629,
                        "src": "3075:11:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
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
                        }
                      ],
                      "id": 632,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 790,
                      "src": "2972:20:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 639,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2972:124:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 640,
                  "nodeType": "ExpressionStatement",
                  "src": "2972:124:3"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 642,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 630,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 626,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 642,
                  "src": "2841:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 624,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2841:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 625,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2841:9:3",
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
                  "id": 629,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 642,
                  "src": "2868:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 627,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2868:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 628,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2868:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2831:61:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 631,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2914:0:3"
            },
            "scope": 791,
            "src": "2810:293:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 695,
              "nodeType": "Block",
              "src": "3527:549:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 655,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 652,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 645,
                            "src": "3601:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 653,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3601:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 654,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3618:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3601:18:3",
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
                      "id": 651,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3593:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 656,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3593:27:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 657,
                  "nodeType": "ExpressionStatement",
                  "src": "3593:27:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 662,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 659,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 648,
                            "src": "3699:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 660,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3699:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 661,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3720:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3699:22:3",
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
                      "id": 658,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3691:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 663,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3691:31:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 664,
                  "nodeType": "ExpressionStatement",
                  "src": "3691:31:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 670,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 666,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 645,
                            "src": "3806:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 667,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3806:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 668,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 648,
                            "src": "3824:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 669,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3824:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3806:36:3",
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
                      "id": 665,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "3798:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 671,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3798:45:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 672,
                  "nodeType": "ExpressionStatement",
                  "src": "3798:45:3"
                },
                {
                  "body": {
                    "id": 693,
                    "nodeType": "Block",
                    "src": "3963:107:3",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 685,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 645,
                                "src": "4003:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 687,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 686,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 674,
                                "src": "4011:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "4003:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 688,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 648,
                                "src": "4031:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 690,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 689,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 674,
                                "src": "4043:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "4031:14:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 684,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 623,
                            "src": "3977:8:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 691,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3977:82:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 692,
                        "nodeType": "ExpressionStatement",
                        "src": "3977:82:3"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 680,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 677,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 674,
                      "src": "3938:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 678,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 645,
                        "src": "3942:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 679,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3942:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3938:18:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 694,
                  "initializationExpression": {
                    "assignments": [
                      674
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 674,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 696,
                        "src": "3926:6:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 673,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3926:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 676,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 675,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3935:1:3",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3926:10:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 682,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3958:3:3",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 681,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 674,
                        "src": "3958:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 683,
                    "nodeType": "ExpressionStatement",
                    "src": "3958:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "3921:149:3"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 696,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 649,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 645,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 696,
                  "src": "3454:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 643,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3454:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 644,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3454:9:3",
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
                  "id": 648,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 696,
                  "src": "3481:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 646,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3481:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 647,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3481:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3444:61:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 650,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3527:0:3"
            },
            "scope": 791,
            "src": "3422:654:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 729,
              "nodeType": "Block",
              "src": "4607:419:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 712,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 702,
                        "src": "4747:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 713,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 704,
                        "src": "4767:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 714,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 698,
                        "src": "4790:5:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 715,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2642,
                          "src": "4809:5:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2640_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 716,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2617,
                        "src": "4809:11:3",
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
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 708,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2642,
                              "src": "4704:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2640_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 709,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2615,
                            "src": "4704:19:3",
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
                          "id": 707,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2568,
                          "src": "4689:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2568_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 710,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4689:35:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2568",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 711,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2567,
                      "src": "4689:44:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 717,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4689:141:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 718,
                  "nodeType": "ExpressionStatement",
                  "src": "4689:141:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 724,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 700,
                        "src": "4963:3:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 725,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 702,
                        "src": "4980:6:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 726,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 704,
                        "src": "5000:9:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 720,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2642,
                              "src": "4917:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2640_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 721,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2617,
                            "src": "4917:11:3",
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
                          "id": 719,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2607,
                          "src": "4910:6:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2607_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 722,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4910:19:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2607",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 723,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2588,
                      "src": "4910:39:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 727,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4910:109:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 728,
                  "nodeType": "ExpressionStatement",
                  "src": "4910:109:3"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 730,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 705,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 698,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4497:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 697,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4497:7:3",
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
                  "id": 700,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4520:11:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 699,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4520:7:3",
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
                  "id": 702,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4541:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 701,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4541:7:3",
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
                  "id": 704,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 730,
                  "src": "4565:14:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 703,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4565:4:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4487:98:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 706,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4607:0:3"
            },
            "scope": 791,
            "src": "4463:563:3",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 789,
              "nodeType": "Block",
              "src": "5602:608:3",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 747,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 744,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 737,
                            "src": "5677:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 745,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5677:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 746,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5694:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5677:18:3",
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
                      "id": 743,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5669:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 748,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5669:27:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 749,
                  "nodeType": "ExpressionStatement",
                  "src": "5669:27:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 754,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 751,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 740,
                            "src": "5775:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 752,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5775:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 753,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5796:1:3",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "5775:22:3",
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
                      "id": 750,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5767:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 755,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5767:31:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 756,
                  "nodeType": "ExpressionStatement",
                  "src": "5767:31:3"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 762,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 758,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 737,
                            "src": "5882:7:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 759,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5882:14:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 760,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 740,
                            "src": "5900:11:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 761,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5900:18:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "5882:36:3",
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
                      "id": 757,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        3997,
                        3998
                      ],
                      "referencedDeclaration": 3997,
                      "src": "5874:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 763,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5874:45:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 764,
                  "nodeType": "ExpressionStatement",
                  "src": "5874:45:3"
                },
                {
                  "body": {
                    "id": 787,
                    "nodeType": "Block",
                    "src": "6046:158:3",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 777,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 732,
                              "src": "6093:5:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 778,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 734,
                              "src": "6116:3:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 779,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 737,
                                "src": "6137:7:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 781,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 780,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 766,
                                "src": "6145:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "6137:10:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 782,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 740,
                                "src": "6165:11:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 784,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 783,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 766,
                                "src": "6177:1:3",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "6165:14:3",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
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
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 776,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 730,
                            "src": "6060:15:3",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
                            }
                          },
                          "id": 785,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "6060:133:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 786,
                        "nodeType": "ExpressionStatement",
                        "src": "6060:133:3"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 772,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 769,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 766,
                      "src": "6021:1:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "BinaryOperation",
                    "operator": "<",
                    "rightExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 770,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 737,
                        "src": "6025:7:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 771,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "6025:14:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "6021:18:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 788,
                  "initializationExpression": {
                    "assignments": [
                      766
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 766,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 790,
                        "src": "6009:6:3",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 765,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "6009:4:3",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 768,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 767,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "6018:1:3",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "6009:10:3"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 774,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "6041:3:3",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 773,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 766,
                        "src": "6041:1:3",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 775,
                    "nodeType": "ExpressionStatement",
                    "src": "6041:3:3"
                  },
                  "nodeType": "ForStatement",
                  "src": "6004:200:3"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 790,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 741,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 732,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5485:13:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 731,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5485:7:3",
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
                  "id": 734,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5508:11:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 733,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5508:7:3",
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
                  "id": 737,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5529:17:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 735,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5529:7:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 736,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5529:9:3",
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
                  "id": 740,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 790,
                  "src": "5556:18:3",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 738,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "5556:4:3",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 739,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5556:6:3",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5475:105:3"
            },
            "payable": false,
            "returnParameters": {
              "id": 742,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5602:0:3"
            },
            "scope": 791,
            "src": "5446:764:3",
            "stateMutability": "nonpayable",
            "superFunction": 2464,
            "visibility": "internal"
          }
        ],
        "scope": 792,
        "src": "1049:5163:3"
      }
    ],
    "src": "597:5616:3"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-08T05:31:02.854Z"
}