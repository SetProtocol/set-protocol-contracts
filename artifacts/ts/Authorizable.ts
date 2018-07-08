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
  "bytecode": "0x608060405260008054600160a060020a03191633179055610ab9806100256000396000f3006080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e811461009d578063494503d4146100c057806370712939146100f4578063715018a6146101155780638da5cb5b1461012a5780639ad267441461013f578063b918161114610163578063d39de6e914610198578063f2fde38b146101fd575b600080fd5b3480156100a957600080fd5b506100be600160a060020a036004351661021e565b005b3480156100cc57600080fd5b506100d86004356103e5565b60408051600160a060020a039092168252519081900360200190f35b34801561010057600080fd5b506100be600160a060020a036004351661040d565b34801561012157600080fd5b506100be610626565b34801561013657600080fd5b506100d8610692565b34801561014b57600080fd5b506100be600160a060020a03600435166024356106a1565b34801561016f57600080fd5b50610184600160a060020a036004351661092e565b604080519115158252519081900360200190f35b3480156101a457600080fd5b506101ad610943565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e95781810151838201526020016101d1565b505050509050019250505060405180910390f35b34801561020957600080fd5b506100be600160a060020a03600435166109a6565b600054600160a060020a0316331461023557600080fd5b600160a060020a038116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff161561033e5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103035781810151838201526020016102eb565b50505050905090810190601f1680156103305780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106103f357fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461042557600080fd5b600160a060020a038216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff1615156104f35760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b5050600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156106225781600160a060020a031660028281548110151561053957fe5b600091825260209091200154600160a060020a0316141561061a5760028054600019810190811061056657fe5b60009182526020909120015460028054600160a060020a03909216918390811061058c57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906105d59082610a46565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610622565b600101610516565b5050565b600054600160a060020a0316331461063d57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a031633146106b857600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106107695760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b5081600160a060020a031660028281548110151561078357fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e00000000000000000000000000000000000000908301529091600160a060020a03909116146108485760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b50600160a060020a0382166000908152600160205260409020805460ff1916905560028054600019810190811061087b57fe5b60009182526020909120015460028054600160a060020a0390921691839081106108a157fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906108ea9082610a46565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60016020526000908152604090205460ff1681565b6060600280548060200260200160405190810160405280929190818152602001828054801561099b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161097d575b505050505090505b90565b600054600160a060020a031633146109bd57600080fd5b6109c6816109c9565b50565b600160a060020a03811615156109de57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610a6a57600083815260209020610a6a918101908301610a6f565b505050565b6109a391905b80821115610a895760008155600101610a75565b50905600a165627a7a72305820125ef64ea0096f99caea7b8e479c0b9ec4abf897e21fe68b9e334af49c2397de0029",
  "deployedBytecode": "0x6080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e811461009d578063494503d4146100c057806370712939146100f4578063715018a6146101155780638da5cb5b1461012a5780639ad267441461013f578063b918161114610163578063d39de6e914610198578063f2fde38b146101fd575b600080fd5b3480156100a957600080fd5b506100be600160a060020a036004351661021e565b005b3480156100cc57600080fd5b506100d86004356103e5565b60408051600160a060020a039092168252519081900360200190f35b34801561010057600080fd5b506100be600160a060020a036004351661040d565b34801561012157600080fd5b506100be610626565b34801561013657600080fd5b506100d8610692565b34801561014b57600080fd5b506100be600160a060020a03600435166024356106a1565b34801561016f57600080fd5b50610184600160a060020a036004351661092e565b604080519115158252519081900360200190f35b3480156101a457600080fd5b506101ad610943565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e95781810151838201526020016101d1565b505050509050019250505060405180910390f35b34801561020957600080fd5b506100be600160a060020a03600435166109a6565b600054600160a060020a0316331461023557600080fd5b600160a060020a038116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff161561033e5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103035781810151838201526020016102eb565b50505050905090810190601f1680156103305780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106103f357fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461042557600080fd5b600160a060020a038216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff1615156104f35760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b5050600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156106225781600160a060020a031660028281548110151561053957fe5b600091825260209091200154600160a060020a0316141561061a5760028054600019810190811061056657fe5b60009182526020909120015460028054600160a060020a03909216918390811061058c57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906105d59082610a46565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610622565b600101610516565b5050565b600054600160a060020a0316331461063d57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a031633146106b857600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106107695760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b5081600160a060020a031660028281548110151561078357fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e00000000000000000000000000000000000000908301529091600160a060020a03909116146108485760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103035781810151838201526020016102eb565b50600160a060020a0382166000908152600160205260409020805460ff1916905560028054600019810190811061087b57fe5b60009182526020909120015460028054600160a060020a0390921691839081106108a157fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906108ea9082610a46565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60016020526000908152604090205460ff1681565b6060600280548060200260200160405190810160405280929190818152602001828054801561099b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161097d575b505050505090505b90565b600054600160a060020a031633146109bd57600080fd5b6109c6816109c9565b50565b600160a060020a03811615156109de57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610a6a57600083815260209020610a6a918101908301610a6f565b505050565b6109a391905b80821115610a895760008155600101610a75565b50905600a165627a7a72305820125ef64ea0096f99caea7b8e479c0b9ec4abf897e21fe68b9e334af49c2397de0029",
  "sourceMap": "963:4845:45:-;;;567:5:59;:18;;-1:-1:-1;;;;;;567:18:59;575:10;567:18;;;963:4845:45;;;;;;",
  "deployedSourceMap": "963:4845:45:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:558;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2599:558:45;-1:-1:-1;;;;;2599:558:45;;;;;;;1721:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1721:28:45;;;;;;;;;-1:-1:-1;;;;;1721:28:45;;;;;;;;;;;;;;3324:980;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3324:980:45;-1:-1:-1;;;;;3324:980:45;;;;;827:111:59;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:59;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:59;;;;4571:939:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4571:939:45;-1:-1:-1;;;;;4571:939:45;;;;;;;1634:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1634:43:45;-1:-1:-1;;;;;1634:43:45;;;;;;;;;;;;;;;;;;;;;;;5620:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5620:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5620:186:45;;;;;;;;;;;;;;;;;1100:103:59;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:59;-1:-1:-1;;;;;1100:103:59;;;;;2599:558:45;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2779:23:45;;;;;;:10;:23;;;;;;;;;;2816:25;;;;;;;;;;;;;;;;;;;;;;;;;;;2779:23;;2778:24;2757:94;;;;-1:-1:-1;;;;;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;;2903:23:45;;;;;;2929:4;2903:23;;;;;;;;:30;;-1:-1:-1;;2903:30:45;;;;;2988:11;27:10:-1;;23:18;;;45:23;;2988:29:45;;;;;;;;;-1:-1:-1;;2988:29:45;;;;;3074:76;;3130:10;3074:76;;;;;;;;;;;;;;2599:558;:::o;1721:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1721:28:45;;-1:-1:-1;1721:28:45;:::o;3324:980::-;3664:6;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;3489:23:45;;;;;;:10;:23;;;;;;;;;;3526:21;;;;;;;;;;;;;;;;;;;;;;;;;;;3489:23;;3468:89;;;;;;-1:-1:-1;;;;;3468:89:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;3468:89:45;-1:-1:-1;;;;;;;3625:23:45;;;;;;:10;:23;;;;;3618:30;;-1:-1:-1;;3618:30:45;;;3659:639;3680:11;:18;3676:22;;3659:639;;;3812:11;-1:-1:-1;;;;;3794:29:45;:11;3806:1;3794:14;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3794:14:45;:29;3790:498;;;3938:11;3950:18;;-1:-1:-1;;3950:22:45;;;3938:35;;;;;;;;;;;;;;;;3921:11;:14;;-1:-1:-1;;;;;3938:35:45;;;;3933:1;;3921:14;;;;;;;;;;;;;;;:52;;-1:-1:-1;;3921:52:45;-1:-1:-1;;;;;3921:52:45;;;;;;;;;;4040:11;:23;;-1:-1:-1;;4040:23:45;;;;;;:::i;:::-;-1:-1:-1;4143:107:45;;;4222:10;4143:107;;;;-1:-1:-1;;;;;4143:107:45;;;;;;;;;;;;;4268:5;;3790:498;3700:3;;3659:639;;;3324:980;;:::o;827:111:59:-;719:5;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:59;;;;884:25;;;931:1;915:18;;-1:-1:-1;;915:18:59;;;827:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:59;;:::o;4571:939:45:-;719:5:59;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;4809:11:45;:18;4841:19;;;;;;;;;;;;;;;;;;;;;;;;;4800:27;;4779:91;;;;-1:-1:-1;;;;;4779:91:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4779:91:45;;4999:11;-1:-1:-1;;;;;4976:34:45;:11;4988:6;4976:19;;;;;;;;;;;;;;;;;;;;;5024:22;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4976:19:45;;;:34;4955:101;;;;-1:-1:-1;;;;;4955:101:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4955:101:45;-1:-1:-1;;;;;;5124:23:45;;;;;;:10;:23;;;;;5117:30;;-1:-1:-1;;5117:30:45;;;5245:11;5257:18;;-1:-1:-1;;5257:22:45;;;5245:35;;;;;;;;;;;;;;;;5223:11;:19;;-1:-1:-1;;;;;5245:35:45;;;;5235:6;;5223:19;;;;;;;;;;;;;;;:57;;-1:-1:-1;;5223:57:45;-1:-1:-1;;;;;5223:57:45;;;;;;;;;;5333:11;:23;;-1:-1:-1;;5333:23:45;;;;;;:::i;:::-;-1:-1:-1;5420:83:45;;;5483:10;5420:83;;;;-1:-1:-1;;;;;5420:83:45;;;;;;;;;;;;;4571:939;;:::o;1634:43::-;;;;;;;;;;;;;;;:::o;5620:186::-;5701:9;5788:11;5781:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5781:18:45;;;;;;;;;;;;;;;;;;;;;;;5620:186;;:::o;1100:103:59:-;719:5;;-1:-1:-1;;;;;719:5:59;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1338:171::-;-1:-1:-1;;;;;1408:23:59;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:59;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;1487:17:59;-1:-1:-1;;;;;1487:17:59;;;;;;;;;;1338:171::o;963:4845:45:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\n\n\n/**\n * @title Authorizable\n * @author Set Protocol\n *\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\n * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.\n */\ncontract Authorizable is\n    Ownable\n{\n\n    /* ============ Constants ============ */\n\n    // Error messages\n    string constant SENDER_NOT_AUTHORIZED = \"Sender not authorized to call this method.\";\n    string constant TARGET_NOT_AUTHORIZED = \"Target address must be authorized.\";\n    string constant TARGET_ALREADY_AUTHORIZED = \"Target must not already be authorized.\";\n    string constant INDEX_OUT_OF_BOUNDS = \"Specified array index is out of bounds.\";\n    string constant INDEX_ADDRESS_MISMATCH = \"Address found at index does not match target.\";\n\n    /* ============ State Variables ============ */\n\n    // Mapping of addresses to bool indicator of authorization\n    mapping (address => bool) public authorized;\n\n    // Array of authorized addresses\n    address[] public authorities;\n\n    /* ============ Modifiers ============ */\n\n    // Only authorized addresses can invoke functions with this modifier.\n    modifier onlyAuthorized {\n        require(\n            authorized[msg.sender],\n            SENDER_NOT_AUTHORIZED\n        );\n        _;\n    }\n\n    /* ============ Events ============ */\n\n    // Event emitted when new address is authorized.\n    event AddressAuthorized (\n        address indexed authAddress,\n        address authorizedBy\n    );\n\n    // Event emitted when address is deauthorized.\n    event AuthorizedAddressRemoved (\n        address indexed addressRemoved,\n        address authorizedBy\n    );\n\n    /* ============ Setters ============ */\n\n    /**\n     * Add authorized address to contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address of the new authorized contract\n     */\n\n    function addAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require that address is not already authorized\n        require(\n            !authorized[_authTarget],\n            TARGET_ALREADY_AUTHORIZED\n        );\n\n        // Set address authority to true\n        authorized[_authTarget] = true;\n\n        // Add address to authorities array\n        authorities.push(_authTarget);\n\n        // Emit authorized address event\n        emit AddressAuthorized(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /**\n     * Remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     */\n\n    function removeAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require address is authorized\n        require(\n            authorized[_authTarget],\n            TARGET_NOT_AUTHORIZED\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        for (uint i = 0; i < authorities.length; i++) {\n\n            // Check if address in authorities matches target address\n            if (authorities[i] == _authTarget) {\n\n                // Set target address index value to address at end of array\n                authorities[i] = authorities[authorities.length - 1];\n\n                // Delete last address in array\n                authorities.length -= 1;\n\n                // Emit AuthorizedAddressRemoved event.\n                emit AuthorizedAddressRemoved(\n                    _authTarget,\n                    msg.sender\n                );\n                break;\n            }\n        }\n    }\n\n    /**\n     * More efficiently remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     * @param _index           The index of the _authTarget address in authorities\n     */\n\n    function removeAuthorizedAddressAtIndex(\n        address _authTarget,\n        uint256 _index\n    )\n        external\n        onlyOwner\n    {\n        // Require index is less than length of authorities\n        require(\n            _index < authorities.length,\n            INDEX_OUT_OF_BOUNDS\n        );\n\n        // Require address at index of authorities matches target address\n        require(\n            authorities[_index] == _authTarget,\n            INDEX_ADDRESS_MISMATCH\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        // Replace address at index with address at end of array\n        authorities[_index] = authorities[authorities.length - 1];\n\n        // Remove last address from array\n        authorities.length -= 1;\n\n        // Emit AuthorizedAddressRemoved event.\n        emit AuthorizedAddressRemoved(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /* ============ Getters ============ */\n\n    /**\n     * Get array of authorized addresses.\n     */\n\n    function getAuthorizedAddresses()\n        external\n        view\n        returns (address[] memory)\n    {\n        // Return array of authorized addresses\n        return authorities;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        4358
      ]
    },
    "id": 4359,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4145,
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
        "id": 4147,
        "nodeType": "ImportDirective",
        "scope": 4359,
        "sourceUnit": 5890,
        "src": "622:76:45",
        "symbolAliases": [
          {
            "foreign": 4146,
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
              "id": 4148,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5889,
              "src": "992:7:45",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$5889",
                "typeString": "contract Ownable"
              }
            },
            "id": 4149,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:45"
          }
        ],
        "contractDependencies": [
          5889
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 4358,
        "linearizedBaseContracts": [
          4358,
          5889
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4152,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1076:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4150,
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
              "id": 4151,
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
            "id": 4155,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1166:76:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4153,
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
              "id": 4154,
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
            "id": 4158,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1248:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4156,
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
              "id": 4157,
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
            "id": 4161,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1338:79:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4159,
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
              "id": 4160,
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
            "id": 4164,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1423:88:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4162,
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
              "id": 4163,
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
            "id": 4168,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1634:43:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4167,
              "keyType": {
                "id": 4165,
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
                "id": 4166,
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
            "id": 4171,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1721:28:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4169,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4170,
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
              "id": 4182,
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
                          "id": 4174,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4168,
                          "src": "1932:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4177,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4175,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6356,
                            "src": "1943:3:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4176,
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
                        "id": 4178,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4152,
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
                      "id": 4173,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1911:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4179,
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
                  "id": 4180,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:45"
                },
                {
                  "id": 4181,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:45"
                }
              ]
            },
            "documentation": null,
            "id": 4183,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4172,
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
            "id": 4189,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4185,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4189,
                  "src": "2154:27:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4184,
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
                  "id": 4187,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4189,
                  "src": "2191:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4186,
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
            "id": 4195,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4194,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4191,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4195,
                  "src": "2316:30:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4190,
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
                  "id": 4193,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4195,
                  "src": "2356:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4192,
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
              "id": 4228,
              "nodeType": "Block",
              "src": "2689:468:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4206,
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
                            "id": 4203,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4168,
                            "src": "2779:10:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4205,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4204,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4197,
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
                        "id": 4207,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4158,
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
                      "id": 4202,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2757:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4208,
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
                  "id": 4209,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4214,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4210,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "2903:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4212,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4211,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                      "id": 4213,
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
                  "id": 4215,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4219,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                        "id": 4216,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "2988:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4218,
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
                    "id": 4220,
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
                  "id": 4221,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4223,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                          "id": 4224,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "3130:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4225,
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
                      "id": 4222,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4189,
                      "src": "3074:17:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4226,
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
                  "id": 4227,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:45"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4229,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4200,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4199,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4198,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4197,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4229,
                  "src": "2629:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4196,
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
              "id": 4201,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:45"
            },
            "scope": 4358,
            "src": "2599:558:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4292,
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
                          "id": 4237,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4168,
                          "src": "3489:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4239,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4238,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4231,
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
                        "id": 4240,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4155,
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
                      "id": 4236,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "3468:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4241,
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
                  "id": 4242,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4246,
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
                        "id": 4243,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "3625:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4245,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4244,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4231,
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
                  "id": 4247,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:45"
                },
                {
                  "body": {
                    "id": 4290,
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
                          "id": 4263,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4259,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4171,
                              "src": "3794:11:45",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4261,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4260,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4249,
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
                            "id": 4262,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4231,
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
                        "id": 4289,
                        "nodeType": "IfStatement",
                        "src": "3790:498:45",
                        "trueBody": {
                          "id": 4288,
                          "nodeType": "Block",
                          "src": "3825:463:45",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4273,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4264,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "3921:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4266,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4265,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4249,
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
                                    "id": 4267,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "3938:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4272,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4271,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4268,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4171,
                                        "src": "3950:11:45",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4269,
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
                                      "id": 4270,
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
                              "id": 4274,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:45"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4279,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4275,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "4040:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4277,
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
                                  "id": 4278,
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
                              "id": 4280,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:45"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4282,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4231,
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
                                      "id": 4283,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 6356,
                                      "src": "4222:3:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4284,
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
                                  "id": 4281,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4195,
                                  "src": "4143:24:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4285,
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
                              "id": 4286,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:45"
                            },
                            {
                              "id": 4287,
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
                    "id": 4255,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4252,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4249,
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
                        "id": 4253,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "3680:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4254,
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
                  "id": 4291,
                  "initializationExpression": {
                    "assignments": [
                      4249
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4249,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4293,
                        "src": "3664:6:45",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4248,
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
                    "id": 4251,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4250,
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
                      "id": 4257,
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
                        "id": 4256,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4249,
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
                    "id": 4258,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:45"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:45"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4293,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4234,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4233,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4231,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "3357:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4230,
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
              "id": 4235,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:45"
            },
            "scope": 4358,
            "src": "3324:980:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4347,
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
                        "id": 4306,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4303,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
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
                            "id": 4304,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "4809:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4305,
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
                        "id": 4307,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4161,
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
                      "id": 4302,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4779:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4308,
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
                  "id": 4309,
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
                        "id": 4315,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4311,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "4976:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4313,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4312,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4297,
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
                          "id": 4314,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4295,
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
                        "id": 4316,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4164,
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
                      "id": 4310,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4955:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4317,
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
                  "id": 4318,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4322,
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
                        "id": 4319,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "5124:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4321,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4320,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4295,
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
                  "id": 4323,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4324,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5223:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4326,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4325,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4297,
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
                        "id": 4327,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5245:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4332,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4328,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "5257:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4329,
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
                          "id": 4330,
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
                  "id": 4334,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4335,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5333:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4337,
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
                      "id": 4338,
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
                  "id": 4340,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4342,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4295,
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
                          "id": 4343,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5483:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4344,
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
                      "id": 4341,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4195,
                      "src": "5420:24:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4345,
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
                  "id": 4346,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:45"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4348,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4300,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4299,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4298,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4295,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4348,
                  "src": "4620:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4294,
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
                  "id": 4297,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4348,
                  "src": "4649:14:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4296,
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
              "id": 4301,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:45"
            },
            "scope": 4358,
            "src": "4571:939:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4356,
              "nodeType": "Block",
              "src": "5723:83:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4354,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4171,
                    "src": "5788:11:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 4353,
                  "id": 4355,
                  "nodeType": "Return",
                  "src": "5781:18:45"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 4357,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4349,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4352,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4357,
                  "src": "5701:9:45",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4350,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4351,
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
            "scope": 4358,
            "src": "5620:186:45",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4359,
        "src": "963:4845:45"
      }
    ],
    "src": "597:5212:45"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        4358
      ]
    },
    "id": 4359,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4145,
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
        "id": 4147,
        "nodeType": "ImportDirective",
        "scope": 4359,
        "sourceUnit": 5890,
        "src": "622:76:45",
        "symbolAliases": [
          {
            "foreign": 4146,
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
              "id": 4148,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5889,
              "src": "992:7:45",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$5889",
                "typeString": "contract Ownable"
              }
            },
            "id": 4149,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:45"
          }
        ],
        "contractDependencies": [
          5889
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 4358,
        "linearizedBaseContracts": [
          4358,
          5889
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4152,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1076:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4150,
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
              "id": 4151,
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
            "id": 4155,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1166:76:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4153,
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
              "id": 4154,
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
            "id": 4158,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1248:84:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4156,
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
              "id": 4157,
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
            "id": 4161,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1338:79:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4159,
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
              "id": 4160,
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
            "id": 4164,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1423:88:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4162,
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
              "id": 4163,
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
            "id": 4168,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1634:43:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4167,
              "keyType": {
                "id": 4165,
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
                "id": 4166,
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
            "id": 4171,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 4358,
            "src": "1721:28:45",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4169,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:45",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4170,
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
              "id": 4182,
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
                          "id": 4174,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4168,
                          "src": "1932:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4177,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4175,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 6356,
                            "src": "1943:3:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4176,
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
                        "id": 4178,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4152,
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
                      "id": 4173,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1911:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4179,
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
                  "id": 4180,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:45"
                },
                {
                  "id": 4181,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:45"
                }
              ]
            },
            "documentation": null,
            "id": 4183,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4172,
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
            "id": 4189,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4188,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4185,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4189,
                  "src": "2154:27:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4184,
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
                  "id": 4187,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4189,
                  "src": "2191:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4186,
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
            "id": 4195,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4194,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4191,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4195,
                  "src": "2316:30:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4190,
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
                  "id": 4193,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4195,
                  "src": "2356:20:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4192,
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
              "id": 4228,
              "nodeType": "Block",
              "src": "2689:468:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4206,
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
                            "id": 4203,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4168,
                            "src": "2779:10:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4205,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4204,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4197,
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
                        "id": 4207,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4158,
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
                      "id": 4202,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2757:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4208,
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
                  "id": 4209,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4214,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4210,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "2903:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4212,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4211,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                      "id": 4213,
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
                  "id": 4215,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4219,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                        "id": 4216,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "2988:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4218,
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
                    "id": 4220,
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
                  "id": 4221,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4223,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4197,
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
                          "id": 4224,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "3130:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4225,
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
                      "id": 4222,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4189,
                      "src": "3074:17:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4226,
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
                  "id": 4227,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:45"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4229,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4200,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4199,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4198,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4197,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4229,
                  "src": "2629:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4196,
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
              "id": 4201,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:45"
            },
            "scope": 4358,
            "src": "2599:558:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4292,
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
                          "id": 4237,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4168,
                          "src": "3489:10:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4239,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4238,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4231,
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
                        "id": 4240,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4155,
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
                      "id": 4236,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "3468:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4241,
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
                  "id": 4242,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4246,
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
                        "id": 4243,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "3625:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4245,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4244,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4231,
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
                  "id": 4247,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:45"
                },
                {
                  "body": {
                    "id": 4290,
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
                          "id": 4263,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4259,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4171,
                              "src": "3794:11:45",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4261,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4260,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4249,
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
                            "id": 4262,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4231,
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
                        "id": 4289,
                        "nodeType": "IfStatement",
                        "src": "3790:498:45",
                        "trueBody": {
                          "id": 4288,
                          "nodeType": "Block",
                          "src": "3825:463:45",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4273,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4264,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "3921:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4266,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4265,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4249,
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
                                    "id": 4267,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "3938:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4272,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4271,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4268,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4171,
                                        "src": "3950:11:45",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4269,
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
                                      "id": 4270,
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
                              "id": 4274,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:45"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4279,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4275,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4171,
                                    "src": "4040:11:45",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4277,
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
                                  "id": 4278,
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
                              "id": 4280,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:45"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4282,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4231,
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
                                      "id": 4283,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 6356,
                                      "src": "4222:3:45",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4284,
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
                                  "id": 4281,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4195,
                                  "src": "4143:24:45",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4285,
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
                              "id": 4286,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:45"
                            },
                            {
                              "id": 4287,
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
                    "id": 4255,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4252,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4249,
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
                        "id": 4253,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "3680:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4254,
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
                  "id": 4291,
                  "initializationExpression": {
                    "assignments": [
                      4249
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4249,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4293,
                        "src": "3664:6:45",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4248,
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
                    "id": 4251,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4250,
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
                      "id": 4257,
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
                        "id": 4256,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4249,
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
                    "id": 4258,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:45"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:45"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4293,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4234,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4233,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4232,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4231,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4293,
                  "src": "3357:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4230,
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
              "id": 4235,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:45"
            },
            "scope": 4358,
            "src": "3324:980:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4347,
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
                        "id": 4306,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4303,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4297,
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
                            "id": 4304,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "4809:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4305,
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
                        "id": 4307,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4161,
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
                      "id": 4302,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4779:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4308,
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
                  "id": 4309,
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
                        "id": 4315,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4311,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "4976:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4313,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4312,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4297,
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
                          "id": 4314,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4295,
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
                        "id": 4316,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4164,
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
                      "id": 4310,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "4955:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4317,
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
                  "id": 4318,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4322,
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
                        "id": 4319,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4168,
                        "src": "5124:10:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4321,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4320,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4295,
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
                  "id": 4323,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4324,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5223:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4326,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4325,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4297,
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
                        "id": 4327,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5245:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4332,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4328,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4171,
                            "src": "5257:11:45",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4329,
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
                          "id": 4330,
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
                  "id": 4334,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:45"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4339,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4335,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4171,
                        "src": "5333:11:45",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4337,
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
                      "id": 4338,
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
                  "id": 4340,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:45"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4342,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4295,
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
                          "id": 4343,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5483:3:45",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4344,
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
                      "id": 4341,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4195,
                      "src": "5420:24:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4345,
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
                  "id": 4346,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:45"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4348,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4300,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4299,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5837,
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
              "id": 4298,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4295,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4348,
                  "src": "4620:19:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4294,
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
                  "id": 4297,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4348,
                  "src": "4649:14:45",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4296,
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
              "id": 4301,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:45"
            },
            "scope": 4358,
            "src": "4571:939:45",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4356,
              "nodeType": "Block",
              "src": "5723:83:45",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4354,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4171,
                    "src": "5788:11:45",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 4353,
                  "id": 4355,
                  "nodeType": "Return",
                  "src": "5781:18:45"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 4357,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4349,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:45"
            },
            "payable": false,
            "returnParameters": {
              "id": 4353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4352,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 4357,
                  "src": "5701:9:45",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4350,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:45",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 4351,
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
            "scope": 4358,
            "src": "5620:186:45",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 4359,
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
  "updatedAt": "2018-07-08T01:11:15.202Z"
}