export const Authorizable = 
{
  "contractName": "Authorizable",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authorities",
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
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorized",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "authAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AddressAuthorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "addressRemoved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AuthorizedAddressRemoved",
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
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "addAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "removeAuthorizedAddressAtIndex",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAuthorizedAddresses",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610dcb806100256000396000f3006080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e811461009d578063494503d4146100cd578063707129391461010e578063715018a61461013c5780638da5cb5b146101515780639ad2674414610166578063b918161114610197578063d39de6e9146101d9578063f2fde38b1461023e575b600080fd5b3480156100a957600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff6004351661026c565b005b3480156100d957600080fd5b506100e560043561049a565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561011a57600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff600435166104cf565b34801561014857600080fd5b506100cb6107cc565b34801561015d57600080fd5b506100e561085d565b34801561017257600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff60043516602435610879565b3480156101a357600080fd5b506101c573ffffffffffffffffffffffffffffffffffffffff60043516610bf4565b604080519115158252519081900360200190f35b3480156101e557600080fd5b506101ee610c09565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022a578181015183820152602001610212565b505050509050019250505060405180910390f35b34801561024a57600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff60043516610c79565b60005473ffffffffffffffffffffffffffffffffffffffff16331461029057600080fd5b73ffffffffffffffffffffffffffffffffffffffff8116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff16156103bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561038257818101518382015260200161036a565b50505050905090810190601f1680156103af5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8116600081815260016020818152604080842080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106104a857fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b6000805473ffffffffffffffffffffffffffffffffffffffff1633146104f457600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff1615156105e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b505073ffffffffffffffffffffffffffffffffffffffff8116600090815260016020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690555b6002548110156107c8578173ffffffffffffffffffffffffffffffffffffffff1660028281548110151561066457fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1614156107c057600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81019081106106bc57fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff90921691839081106106ef57fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019061076e9082610d58565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a26107c8565b600101610634565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107f057600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461089d57600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e0000000000000000000000000000000000000000000000000091810191909152908210610965576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b508173ffffffffffffffffffffffffffffffffffffffff1660028281548110151561098c57fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e0000000000000000000000000000000000000090830152909173ffffffffffffffffffffffffffffffffffffffff90911614610a75576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b5073ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610af157fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff9092169183908110610b2457fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190610ba39082610d58565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610c6e57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610c43575b505050505090505b90565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c9d57600080fd5b610ca681610ca9565b50565b73ffffffffffffffffffffffffffffffffffffffff81161515610ccb57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b815481835581811115610d7c57600083815260209020610d7c918101908301610d81565b505050565b610c7691905b80821115610d9b5760008155600101610d87565b50905600a165627a7a723058205ccde7644aa9604d359130ce5e33670e2b3eed6a05593e5e781d167c12b6a4980029",
  "deployedBytecode": "0x6080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e811461009d578063494503d4146100cd578063707129391461010e578063715018a61461013c5780638da5cb5b146101515780639ad2674414610166578063b918161114610197578063d39de6e9146101d9578063f2fde38b1461023e575b600080fd5b3480156100a957600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff6004351661026c565b005b3480156100d957600080fd5b506100e560043561049a565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561011a57600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff600435166104cf565b34801561014857600080fd5b506100cb6107cc565b34801561015d57600080fd5b506100e561085d565b34801561017257600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff60043516602435610879565b3480156101a357600080fd5b506101c573ffffffffffffffffffffffffffffffffffffffff60043516610bf4565b604080519115158252519081900360200190f35b3480156101e557600080fd5b506101ee610c09565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022a578181015183820152602001610212565b505050509050019250505060405180910390f35b34801561024a57600080fd5b506100cb73ffffffffffffffffffffffffffffffffffffffff60043516610c79565b60005473ffffffffffffffffffffffffffffffffffffffff16331461029057600080fd5b73ffffffffffffffffffffffffffffffffffffffff8116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff16156103bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561038257818101518382015260200161036a565b50505050905090810190601f1680156103af5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8116600081815260016020818152604080842080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106104a857fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b6000805473ffffffffffffffffffffffffffffffffffffffff1633146104f457600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff1615156105e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b505073ffffffffffffffffffffffffffffffffffffffff8116600090815260016020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690555b6002548110156107c8578173ffffffffffffffffffffffffffffffffffffffff1660028281548110151561066457fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff1614156107c057600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81019081106106bc57fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff90921691839081106106ef57fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff019061076e9082610d58565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a26107c8565b600101610634565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107f057600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff16331461089d57600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e0000000000000000000000000000000000000000000000000091810191909152908210610965576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b508173ffffffffffffffffffffffffffffffffffffffff1660028281548110151561098c57fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e0000000000000000000000000000000000000090830152909173ffffffffffffffffffffffffffffffffffffffff90911614610a75576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360008381101561038257818101518382015260200161036a565b5073ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610af157fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff9092169183908110610b2457fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190610ba39082610d58565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610c6e57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610c43575b505050505090505b90565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c9d57600080fd5b610ca681610ca9565b50565b73ffffffffffffffffffffffffffffffffffffffff81161515610ccb57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b815481835581811115610d7c57600083815260209020610d7c918101908301610d81565b505050565b610c7691905b80821115610d9b5760008155600101610d87565b50905600a165627a7a723058205ccde7644aa9604d359130ce5e33670e2b3eed6a05593e5e781d167c12b6a4980029",
  "sourceMap": "963:4845:45:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;963:4845:45;;;;;;",
  "deployedSourceMap": "963:4845:45:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:558;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2599:558:45;;;;;;;;;1721:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1721:28:45;;;;;;;;;;;;;;;;;;;;;;;;3324:980;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3324:980:45;;;;;;;827:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;4571:939:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4571:939:45;;;;;;;;;1634:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1634:43:45;;;;;;;;;;;;;;;;;;;;;;;;;5620:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5620:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5620:186:45;;;;;;;;;;;;;;;;;1100:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;;;;;;;2599:558:45;719:5:61;;;;705:10;:19;697:28;;;;;;2779:23:45;;;;;;;:10;:23;;;;;;;;;;2816:25;;;;;;;;;;;;;;;;;;;;;;;;;;;2779:23;;2778:24;2757:94;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2903:23:45;;;;;;;2929:4;2903:23;;;;;;;;:30;;;;;;;;2988:11;27:10:-1;;23:18;;;45:23;;2988:29:45;;;;;;;;;;;;;;;3074:76;;3130:10;3074:76;;;;;;;;;;;;;;2599:558;:::o;1721:28::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;1721:28:45;:::o;3324:980::-;3664:6;719:5:61;;;;705:10;:19;697:28;;;;;;3489:23:45;;;;;;;:10;:23;;;;;;;;;;3526:21;;;;;;;;;;;;;;;;;;;;;;;;;;;3489:23;;3468:89;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;3468:89:45;-1:-1:-1;;3625:23:45;;;;;;;:10;:23;;;;;3618:30;;;;;;3659:639;3680:11;:18;3676:22;;3659:639;;;3812:11;3794:29;;:11;3806:1;3794:14;;;;;;;;;;;;;;;;;;;;;;:29;3790:498;;;3938:11;3950:18;;:22;;;;3938:35;;;;;;;;;;;;;;;;3921:11;:14;;3938:35;;;;;3933:1;;3921:14;;;;;;;;;;;;;;;:52;;;;;;;;;;;;;;;4040:11;:23;;;;;;;;;:::i;:::-;-1:-1:-1;4143:107:45;;;4222:10;4143:107;;;;;;;;;;;;;;;;;;4268:5;;3790:498;3700:3;;3659:639;;;3324:980;;:::o;827:111:61:-;719:5;;;;705:10;:19;697:28;;;;;;903:5;;;884:25;;903:5;;;;;884:25;;;931:1;915:18;;;;;;827:111::o;238:20::-;;;;;;:::o;4571:939:45:-;719:5:61;;;;705:10;:19;697:28;;;;;;4809:11:45;:18;4841:19;;;;;;;;;;;;;;;;;;;;;;;;;4800:27;;4779:91;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4779:91:45;;4999:11;4976:34;;:11;4988:6;4976:19;;;;;;;;;;;;;;;;;;;;;5024:22;;;;;;;;;;;;;;;;;;;;;;;;;;4976:19;;;;:34;4955:101;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4955:101:45;-1:-1:-1;5124:23:45;;;;;;;:10;:23;;;;;5117:30;;;;;;5245:11;5257:18;;:22;;;;5245:35;;;;;;;;;;;;;;;;5223:11;:19;;5245:35;;;;;5235:6;;5223:19;;;;;;;;;;;;;;;:57;;;;;;;;;;;;;;;5333:11;:23;;;;;;;;;:::i;:::-;-1:-1:-1;5420:83:45;;;5483:10;5420:83;;;;;;;;;;;;;;;;;;4571:939;;:::o;1634:43::-;;;;;;;;;;;;;;;:::o;5620:186::-;5701:9;5788:11;5781:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5620:186;;:::o;1100:103:61:-;719:5;;;;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1338:171::-;1408:23;;;;;1400:32;;;;;;1464:5;;;1443:38;;;;;;;1464:5;;;1443:38;;;1487:5;:17;;;;;;;;;;;;;;;1338:171::o;963:4845:45:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\n\n\n/**\n * @title Authorizable\n * @author Set Protocol\n *\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\n * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.\n */\ncontract Authorizable is\n    Ownable\n{\n\n    /* ============ Constants ============ */\n\n    // Error messages\n    string constant SENDER_NOT_AUTHORIZED = \"Sender not authorized to call this method.\";\n    string constant TARGET_NOT_AUTHORIZED = \"Target address must be authorized.\";\n    string constant TARGET_ALREADY_AUTHORIZED = \"Target must not already be authorized.\";\n    string constant INDEX_OUT_OF_BOUNDS = \"Specified array index is out of bounds.\";\n    string constant INDEX_ADDRESS_MISMATCH = \"Address found at index does not match target.\";\n\n    /* ============ State Variables ============ */\n\n    // Mapping of addresses to bool indicator of authorization\n    mapping (address => bool) public authorized;\n\n    // Array of authorized addresses\n    address[] public authorities;\n\n    /* ============ Modifiers ============ */\n\n    // Only authorized addresses can invoke functions with this modifier.\n    modifier onlyAuthorized {\n        require(\n            authorized[msg.sender],\n            SENDER_NOT_AUTHORIZED\n        );\n        _;\n    }\n\n    /* ============ Events ============ */\n\n    // Event emitted when new address is authorized.\n    event AddressAuthorized (\n        address indexed authAddress,\n        address authorizedBy\n    );\n\n    // Event emitted when address is deauthorized.\n    event AuthorizedAddressRemoved (\n        address indexed addressRemoved,\n        address authorizedBy\n    );\n\n    /* ============ Setters ============ */\n\n    /**\n     * Add authorized address to contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address of the new authorized contract\n     */\n\n    function addAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require that address is not already authorized\n        require(\n            !authorized[_authTarget],\n            TARGET_ALREADY_AUTHORIZED\n        );\n\n        // Set address authority to true\n        authorized[_authTarget] = true;\n\n        // Add address to authorities array\n        authorities.push(_authTarget);\n\n        // Emit authorized address event\n        emit AddressAuthorized(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /**\n     * Remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     */\n\n    function removeAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require address is authorized\n        require(\n            authorized[_authTarget],\n            TARGET_NOT_AUTHORIZED\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        for (uint i = 0; i < authorities.length; i++) {\n\n            // Check if address in authorities matches target address\n            if (authorities[i] == _authTarget) {\n\n                // Set target address index value to address at end of array\n                authorities[i] = authorities[authorities.length - 1];\n\n                // Delete last address in array\n                authorities.length -= 1;\n\n                // Emit AuthorizedAddressRemoved event.\n                emit AuthorizedAddressRemoved(\n                    _authTarget,\n                    msg.sender\n                );\n                break;\n            }\n        }\n    }\n\n    /**\n     * More efficiently remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     * @param _index           The index of the _authTarget address in authorities\n     */\n\n    function removeAuthorizedAddressAtIndex(\n        address _authTarget,\n        uint256 _index\n    )\n        external\n        onlyOwner\n    {\n        // Require index is less than length of authorities\n        require(\n            _index < authorities.length,\n            INDEX_OUT_OF_BOUNDS\n        );\n\n        // Require address at index of authorities matches target address\n        require(\n            authorities[_index] == _authTarget,\n            INDEX_ADDRESS_MISMATCH\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        // Replace address at index with address at end of array\n        authorities[_index] = authorities[authorities.length - 1];\n\n        // Remove last address from array\n        authorities.length -= 1;\n\n        // Emit AuthorizedAddressRemoved event.\n        emit AuthorizedAddressRemoved(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /* ============ Getters ============ */\n\n    /**\n     * Get array of authorized addresses.\n     */\n\n    function getAuthorizedAddresses()\n        external\n        view\n        returns (address[] memory)\n    {\n        // Return array of authorized addresses\n        return authorities;\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/Authorizable.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        4705
      ]
    },
    "id": 4706,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4492,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:45"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 4494,
        "nodeType": "ImportDirective",
        "scope": 4706,
        "sourceUnit": 6433,
        "src": "622:76:45",
        "symbolAliases": [
          {
            "foreign": 4493,
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
              "id": 4495,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "992:7:45",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 4496,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:45"
          }
        ],
        "contractDependencies": [
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 4705,
        "linearizedBaseContracts": [
          4705,
          6432
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4499,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1076:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4497,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1076:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53656e646572206e6f7420617574686f72697a656420746f2063616c6c2074686973206d6574686f642e",
              "id": 4498,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1116:44:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_10199b21ebf84935aea33a882c0275c251121b4f5714541946187192f7438169",
                "typeString": "literal_string \"Sender not authorized to call this method.\""
              },
              "value": "Sender not authorized to call this method."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4502,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1166:76:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4500,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1166:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5461726765742061646472657373206d75737420626520617574686f72697a65642e",
              "id": 4501,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1206:36:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_366140ba62d6876f8f5ac81ce449a05cc217fd70a2a6c4fe20968a2c9a7459fa",
                "typeString": "literal_string \"Target address must be authorized.\""
              },
              "value": "Target address must be authorized."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4505,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1248:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4503,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1248:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "546172676574206d757374206e6f7420616c726561647920626520617574686f72697a65642e",
              "id": 4504,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1292:40:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a33a2795a8a1f2c72bcb412f76b44eb9cb4c52e6a307350a3f6ddaeb1809efd7",
                "typeString": "literal_string \"Target must not already be authorized.\""
              },
              "value": "Target must not already be authorized."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4508,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1338:79:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4506,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1338:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53706563696669656420617272617920696e646578206973206f7574206f6620626f756e64732e",
              "id": 4507,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1376:41:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_1638541c6ab382534775b3e33e4efa6ebe87533c9f35a0f2f538e2ab60ef9410",
                "typeString": "literal_string \"Specified array index is out of bounds.\""
              },
              "value": "Specified array index is out of bounds."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4511,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1423:88:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4509,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1423:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4164647265737320666f756e6420617420696e64657820646f6573206e6f74206d61746368207461726765742e",
              "id": 4510,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1464:47:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8c3cba7e3f322cab1ee42269305798e851a629466be226218b19fcb7d615b25c",
                "typeString": "literal_string \"Address found at index does not match target.\""
              },
              "value": "Address found at index does not match target."
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 4515,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1634:43:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4514,
              "keyType": {
                "id": 4512,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1643:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1634:25:45",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 4513,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1654:4:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 4518,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1721:28:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4516,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4517,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1721:9:45",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4529,
              "nodeType": "Block",
              "src": "1901:116:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4521,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4515,
                          "src": "1932:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4524,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4522,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "1943:3:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4523,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1943:10:45",
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
                        "src": "1932:22:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4525,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4499,
                        "src": "1968:21:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4520,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1911:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1911:88:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4527,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:45"
                },
                {
                  "id": 4528,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:45"
                }
              ]
            },
            "documentation": null,
            "id": 4530,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4519,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1901:0:45"
            },
            "src": "1877:140:45",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4536,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4535,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4532,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4536,
                  "src": "2154:27:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2154:7:45",
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
                  "id": 4534,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4536,
                  "src": "2191:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4533,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2191:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2144:73:45"
            },
            "src": "2120:98:45"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4542,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4541,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4538,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4542,
                  "src": "2316:30:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4537,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:7:45",
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
                  "id": 4540,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4542,
                  "src": "2356:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4539,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2356:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2306:76:45"
            },
            "src": "2275:108:45"
          },
          {
            "body": {
              "id": 4575,
              "nodeType": "Block",
              "src": "2689:468:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4553,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2778:24:45",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4550,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4515,
                            "src": "2779:10:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4552,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4551,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4544,
                            "src": "2790:11:45",
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
                          "src": "2779:23:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4554,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4505,
                        "src": "2816:25:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4549,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2757:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4555,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2757:94:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4556,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4561,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4557,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "2903:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4559,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4558,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "2914:11:45",
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
                      "src": "2903:23:45",
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
                      "id": 4560,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2929:4:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2903:30:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4562,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4566,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "3005:11:45",
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
                        "id": 4563,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "2988:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4565,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2988:16:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 4567,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2988:29:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4568,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4570,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "3105:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4571,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "3130:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4572,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3130:10:45",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4569,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4536,
                      "src": "3074:17:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4573,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3074:76:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4574,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:45"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4576,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4547,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4546,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "2675:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2675:9:45"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4545,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4544,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4576,
                  "src": "2629:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4543,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2629:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2628:21:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4548,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:45"
            },
            "scope": 4705,
            "src": "2599:558:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4639,
              "nodeType": "Block",
              "src": "3417:887:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4584,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4515,
                          "src": "3489:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4586,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4585,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4578,
                          "src": "3500:11:45",
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
                        "src": "3489:23:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4587,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4502,
                        "src": "3526:21:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4583,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "3468:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4588,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3468:89:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4589,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4593,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3618:30:45",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4590,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "3625:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4592,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4591,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4578,
                        "src": "3636:11:45",
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
                      "src": "3625:23:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4594,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:45"
                },
                {
                  "body": {
                    "id": 4637,
                    "nodeType": "Block",
                    "src": "3705:593:45",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 4610,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4606,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4518,
                              "src": "3794:11:45",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4608,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4607,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4596,
                              "src": "3806:1:45",
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
                            "src": "3794:14:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4609,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4578,
                            "src": "3812:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3794:29:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4636,
                        "nodeType": "IfStatement",
                        "src": "3790:498:45",
                        "trueBody": {
                          "id": 4635,
                          "nodeType": "Block",
                          "src": "3825:463:45",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4620,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4611,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "3921:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4613,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4612,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4596,
                                    "src": "3933:1:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "nodeType": "IndexAccess",
                                  "src": "3921:14:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "nodeType": "Assignment",
                                "operator": "=",
                                "rightHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4614,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "3938:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4619,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4618,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4615,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4518,
                                        "src": "3950:11:45",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4616,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3950:18:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "nodeType": "BinaryOperation",
                                    "operator": "-",
                                    "rightExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 4617,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3971:1:45",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3950:22:45",
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
                                  "src": "3938:35:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3921:52:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 4621,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:45"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4626,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4622,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "4040:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4624,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "4040:18:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "Assignment",
                                "operator": "-=",
                                "rightHandSide": {
                                  "argumentTypes": null,
                                  "hexValue": "31",
                                  "id": 4625,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "4062:1:45",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "4040:23:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 4627,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:45"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4629,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4578,
                                    "src": "4189:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 4630,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 6899,
                                      "src": "4222:3:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4631,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "4222:10:45",
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
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 4628,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4542,
                                  "src": "4143:24:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4632,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "4143:107:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_tuple$__$",
                                  "typeString": "tuple()"
                                }
                              },
                              "id": 4633,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:45"
                            },
                            {
                              "id": 4634,
                              "nodeType": "Break",
                              "src": "4268:5:45"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4602,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4599,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4596,
                      "src": "3676:1:45",
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
                        "id": 4600,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "3680:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4601,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3680:18:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3676:22:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4638,
                  "initializationExpression": {
                    "assignments": [
                      4596
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4596,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4640,
                        "src": "3664:6:45",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4595,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3664:4:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 4598,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3673:1:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3664:10:45"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 4604,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3700:3:45",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 4603,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4596,
                        "src": "3700:1:45",
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
                    "id": 4605,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:45"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:45"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4640,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4581,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4580,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "3403:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3403:9:45"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4579,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4578,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4640,
                  "src": "3357:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4577,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3357:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3356:21:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4582,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:45"
            },
            "scope": 4705,
            "src": "3324:980:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4694,
              "nodeType": "Block",
              "src": "4709:801:45",
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
                        "id": 4653,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4650,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4644,
                          "src": "4800:6:45",
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
                            "id": 4651,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "4809:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4652,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4809:18:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4800:27:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4654,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4508,
                        "src": "4841:19:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4649,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4779:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:91:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4656,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:91:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 4662,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4658,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "4976:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4660,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4659,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4644,
                            "src": "4988:6:45",
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
                          "src": "4976:19:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4661,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4642,
                          "src": "4999:11:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4976:34:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4663,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4511,
                        "src": "5024:22:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4657,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4955:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4664,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4955:101:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4665,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4669,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "5117:30:45",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4666,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "5124:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4668,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4667,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4642,
                        "src": "5135:11:45",
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
                      "src": "5124:23:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4670,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4680,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4671,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5223:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4673,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4672,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4644,
                        "src": "5235:6:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "5223:19:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4674,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5245:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4679,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4678,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4675,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "5257:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4676,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5257:18:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "-",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 4677,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5278:1:45",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "src": "5257:22:45",
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
                      "src": "5245:35:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5223:57:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4681,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4686,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4682,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5333:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4684,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5333:18:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "-=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 4685,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5355:1:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5333:23:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4687,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4689,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4642,
                        "src": "5458:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4690,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5483:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4691,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5483:10:45",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4688,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4542,
                      "src": "5420:24:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4692,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5420:83:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4693,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:45"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4695,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4647,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4646,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "4695:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4695:9:45"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4645,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4642,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4695,
                  "src": "4620:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4641,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4620:7:45",
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
                  "id": 4644,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4695,
                  "src": "4649:14:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4643,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4649:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4610:59:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4648,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:45"
            },
            "scope": 4705,
            "src": "4571:939:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4703,
              "nodeType": "Block",
              "src": "5723:83:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4701,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4518,
                    "src": "5788:11:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 4700,
                  "id": 4702,
                  "nodeType": "Return",
                  "src": "5781:18:45"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 4704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4696,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4700,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4699,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "5701:9:45",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4697,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4698,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5701:9:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5700:18:45"
            },
            "scope": 4705,
            "src": "5620:186:45",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4706,
        "src": "963:4845:45"
      }
    ],
    "src": "597:5212:45"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        4705
      ]
    },
    "id": 4706,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4492,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:45"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 4494,
        "nodeType": "ImportDirective",
        "scope": 4706,
        "sourceUnit": 6433,
        "src": "622:76:45",
        "symbolAliases": [
          {
            "foreign": 4493,
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
              "id": 4495,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "992:7:45",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 4496,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:45"
          }
        ],
        "contractDependencies": [
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 4705,
        "linearizedBaseContracts": [
          4705,
          6432
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4499,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1076:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4497,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1076:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53656e646572206e6f7420617574686f72697a656420746f2063616c6c2074686973206d6574686f642e",
              "id": 4498,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1116:44:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_10199b21ebf84935aea33a882c0275c251121b4f5714541946187192f7438169",
                "typeString": "literal_string \"Sender not authorized to call this method.\""
              },
              "value": "Sender not authorized to call this method."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4502,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1166:76:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4500,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1166:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5461726765742061646472657373206d75737420626520617574686f72697a65642e",
              "id": 4501,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1206:36:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_366140ba62d6876f8f5ac81ce449a05cc217fd70a2a6c4fe20968a2c9a7459fa",
                "typeString": "literal_string \"Target address must be authorized.\""
              },
              "value": "Target address must be authorized."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4505,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1248:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4503,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1248:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "546172676574206d757374206e6f7420616c726561647920626520617574686f72697a65642e",
              "id": 4504,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1292:40:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_a33a2795a8a1f2c72bcb412f76b44eb9cb4c52e6a307350a3f6ddaeb1809efd7",
                "typeString": "literal_string \"Target must not already be authorized.\""
              },
              "value": "Target must not already be authorized."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4508,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1338:79:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4506,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1338:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53706563696669656420617272617920696e646578206973206f7574206f6620626f756e64732e",
              "id": 4507,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1376:41:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_1638541c6ab382534775b3e33e4efa6ebe87533c9f35a0f2f538e2ab60ef9410",
                "typeString": "literal_string \"Specified array index is out of bounds.\""
              },
              "value": "Specified array index is out of bounds."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 4511,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1423:88:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4509,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1423:6:45",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4164647265737320666f756e6420617420696e64657820646f6573206e6f74206d61746368207461726765742e",
              "id": 4510,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1464:47:45",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_8c3cba7e3f322cab1ee42269305798e851a629466be226218b19fcb7d615b25c",
                "typeString": "literal_string \"Address found at index does not match target.\""
              },
              "value": "Address found at index does not match target."
            },
            "visibility": "internal"
          },
          {
            "constant": false,
            "id": 4515,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1634:43:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4514,
              "keyType": {
                "id": 4512,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1643:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1634:25:45",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 4513,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1654:4:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 4518,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 4705,
            "src": "1721:28:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4516,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4517,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1721:9:45",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 4529,
              "nodeType": "Block",
              "src": "1901:116:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4521,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4515,
                          "src": "1932:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4524,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4522,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6899,
                            "src": "1943:3:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4523,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1943:10:45",
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
                        "src": "1932:22:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4525,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4499,
                        "src": "1968:21:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4520,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1911:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1911:88:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4527,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:45"
                },
                {
                  "id": 4528,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:45"
                }
              ]
            },
            "documentation": null,
            "id": 4530,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4519,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1901:0:45"
            },
            "src": "1877:140:45",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4536,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4535,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4532,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4536,
                  "src": "2154:27:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2154:7:45",
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
                  "id": 4534,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4536,
                  "src": "2191:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4533,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2191:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2144:73:45"
            },
            "src": "2120:98:45"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4542,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4541,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4538,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4542,
                  "src": "2316:30:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4537,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:7:45",
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
                  "id": 4540,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4542,
                  "src": "2356:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4539,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2356:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2306:76:45"
            },
            "src": "2275:108:45"
          },
          {
            "body": {
              "id": 4575,
              "nodeType": "Block",
              "src": "2689:468:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4553,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2778:24:45",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4550,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4515,
                            "src": "2779:10:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4552,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4551,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4544,
                            "src": "2790:11:45",
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
                          "src": "2779:23:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4554,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4505,
                        "src": "2816:25:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4549,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2757:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4555,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2757:94:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4556,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4561,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4557,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "2903:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4559,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4558,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "2914:11:45",
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
                      "src": "2903:23:45",
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
                      "id": 4560,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2929:4:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2903:30:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4562,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4566,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "3005:11:45",
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
                        "id": 4563,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "2988:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4565,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2988:16:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 4567,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2988:29:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4568,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4570,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4544,
                        "src": "3105:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4571,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "3130:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4572,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3130:10:45",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4569,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4536,
                      "src": "3074:17:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4573,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3074:76:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4574,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:45"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4576,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4547,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4546,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "2675:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2675:9:45"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4545,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4544,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4576,
                  "src": "2629:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4543,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2629:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2628:21:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4548,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:45"
            },
            "scope": 4705,
            "src": "2599:558:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4639,
              "nodeType": "Block",
              "src": "3417:887:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4584,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4515,
                          "src": "3489:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4586,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4585,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4578,
                          "src": "3500:11:45",
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
                        "src": "3489:23:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4587,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4502,
                        "src": "3526:21:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4583,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "3468:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4588,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3468:89:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4589,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4593,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3618:30:45",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4590,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "3625:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4592,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4591,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4578,
                        "src": "3636:11:45",
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
                      "src": "3625:23:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4594,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:45"
                },
                {
                  "body": {
                    "id": 4637,
                    "nodeType": "Block",
                    "src": "3705:593:45",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 4610,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4606,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4518,
                              "src": "3794:11:45",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4608,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4607,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4596,
                              "src": "3806:1:45",
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
                            "src": "3794:14:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4609,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4578,
                            "src": "3812:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3794:29:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4636,
                        "nodeType": "IfStatement",
                        "src": "3790:498:45",
                        "trueBody": {
                          "id": 4635,
                          "nodeType": "Block",
                          "src": "3825:463:45",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4620,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4611,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "3921:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4613,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4612,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4596,
                                    "src": "3933:1:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    }
                                  },
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "nodeType": "IndexAccess",
                                  "src": "3921:14:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "nodeType": "Assignment",
                                "operator": "=",
                                "rightHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4614,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "3938:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4619,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4618,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4615,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4518,
                                        "src": "3950:11:45",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4616,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3950:18:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_uint256",
                                        "typeString": "uint256"
                                      }
                                    },
                                    "nodeType": "BinaryOperation",
                                    "operator": "-",
                                    "rightExpression": {
                                      "argumentTypes": null,
                                      "hexValue": "31",
                                      "id": 4617,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3971:1:45",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3950:22:45",
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
                                  "src": "3938:35:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3921:52:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 4621,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:45"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4626,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4622,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4518,
                                    "src": "4040:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4624,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "4040:18:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_uint256",
                                    "typeString": "uint256"
                                  }
                                },
                                "nodeType": "Assignment",
                                "operator": "-=",
                                "rightHandSide": {
                                  "argumentTypes": null,
                                  "hexValue": "31",
                                  "id": 4625,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "4062:1:45",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "4040:23:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 4627,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:45"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4629,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4578,
                                    "src": "4189:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 4630,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 6899,
                                      "src": "4222:3:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4631,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "4222:10:45",
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
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "id": 4628,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4542,
                                  "src": "4143:24:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4632,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "4143:107:45",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_tuple$__$",
                                  "typeString": "tuple()"
                                }
                              },
                              "id": 4633,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:45"
                            },
                            {
                              "id": 4634,
                              "nodeType": "Break",
                              "src": "4268:5:45"
                            }
                          ]
                        }
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 4602,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4599,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4596,
                      "src": "3676:1:45",
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
                        "id": 4600,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "3680:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4601,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3680:18:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3676:22:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4638,
                  "initializationExpression": {
                    "assignments": [
                      4596
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4596,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4640,
                        "src": "3664:6:45",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4595,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3664:4:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 4598,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4597,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3673:1:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3664:10:45"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 4604,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3700:3:45",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 4603,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4596,
                        "src": "3700:1:45",
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
                    "id": 4605,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:45"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:45"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4640,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4581,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4580,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "3403:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3403:9:45"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4579,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4578,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4640,
                  "src": "3357:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4577,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3357:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3356:21:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4582,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:45"
            },
            "scope": 4705,
            "src": "3324:980:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4694,
              "nodeType": "Block",
              "src": "4709:801:45",
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
                        "id": 4653,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4650,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4644,
                          "src": "4800:6:45",
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
                            "id": 4651,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "4809:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4652,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4809:18:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4800:27:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4654,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4508,
                        "src": "4841:19:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4649,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4779:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:91:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4656,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:91:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        "id": 4662,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4658,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "4976:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4660,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4659,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4644,
                            "src": "4988:6:45",
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
                          "src": "4976:19:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4661,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4642,
                          "src": "4999:11:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4976:34:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4663,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4511,
                        "src": "5024:22:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_string_memory",
                          "typeString": "string memory"
                        }
                      ],
                      "id": 4657,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "4955:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4664,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4955:101:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4665,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4669,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "5117:30:45",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4666,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4515,
                        "src": "5124:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4668,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4667,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4642,
                        "src": "5135:11:45",
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
                      "src": "5124:23:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4670,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4680,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4671,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5223:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4673,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4672,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4644,
                        "src": "5235:6:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "5223:19:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4674,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5245:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4679,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4678,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4675,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4518,
                            "src": "5257:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4676,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5257:18:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "-",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 4677,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5278:1:45",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "src": "5257:22:45",
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
                      "src": "5245:35:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5223:57:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4681,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4686,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4682,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4518,
                        "src": "5333:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4684,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5333:18:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "-=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "31",
                      "id": 4685,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5355:1:45",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5333:23:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4687,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4689,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4642,
                        "src": "5458:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4690,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5483:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4691,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5483:10:45",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "id": 4688,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4542,
                      "src": "5420:24:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4692,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5420:83:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4693,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:45"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4695,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4647,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4646,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "4695:9:45",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4695:9:45"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4645,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4642,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4695,
                  "src": "4620:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4641,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4620:7:45",
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
                  "id": 4644,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4695,
                  "src": "4649:14:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4643,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4649:7:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4610:59:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4648,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:45"
            },
            "scope": 4705,
            "src": "4571:939:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4703,
              "nodeType": "Block",
              "src": "5723:83:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4701,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4518,
                    "src": "5788:11:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 4700,
                  "id": 4702,
                  "nodeType": "Return",
                  "src": "5781:18:45"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 4704,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4696,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4700,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4699,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4704,
                  "src": "5701:9:45",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4697,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4698,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5701:9:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5700:18:45"
            },
            "scope": 4705,
            "src": "5620:186:45",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4706,
        "src": "963:4845:45"
      }
    ],
    "src": "597:5212:45"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.425Z"
}