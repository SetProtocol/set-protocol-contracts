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
  "sourceMap": "963:4845:46:-;;;567:5:62;:18;;-1:-1:-1;;;;;;567:18:62;575:10;567:18;;;963:4845:46;;;;;;",
  "deployedSourceMap": "963:4845:46:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:558;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2599:558:46;-1:-1:-1;;;;;2599:558:46;;;;;;;1721:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1721:28:46;;;;;;;;;-1:-1:-1;;;;;1721:28:46;;;;;;;;;;;;;;3324:980;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3324:980:46;-1:-1:-1;;;;;3324:980:46;;;;;827:111:62;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:62;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:62;;;;4571:939:46;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4571:939:46;-1:-1:-1;;;;;4571:939:46;;;;;;;1634:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1634:43:46;-1:-1:-1;;;;;1634:43:46;;;;;;;;;;;;;;;;;;;;;;;5620:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5620:186:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5620:186:46;;;;;;;;;;;;;;;;;1100:103:62;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:62;-1:-1:-1;;;;;1100:103:62;;;;;2599:558:46;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2779:23:46;;;;;;:10;:23;;;;;;;;;;2816:25;;;;;;;;;;;;;;;;;;;;;;;;;;;2779:23;;2778:24;2757:94;;;;-1:-1:-1;;;;;2757:94:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2757:94:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;;2903:23:46;;;;;;2929:4;2903:23;;;;;;;;:30;;-1:-1:-1;;2903:30:46;;;;;2988:11;27:10:-1;;23:18;;;45:23;;2988:29:46;;;;;;;;;-1:-1:-1;;2988:29:46;;;;;3074:76;;3130:10;3074:76;;;;;;;;;;;;;;2599:558;:::o;1721:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1721:28:46;;-1:-1:-1;1721:28:46;:::o;3324:980::-;3664:6;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;3489:23:46;;;;;;:10;:23;;;;;;;;;;3526:21;;;;;;;;;;;;;;;;;;;;;;;;;;;3489:23;;3468:89;;;;;;-1:-1:-1;;;;;3468:89:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;3468:89:46;-1:-1:-1;;;;;;;3625:23:46;;;;;;:10;:23;;;;;3618:30;;-1:-1:-1;;3618:30:46;;;3659:639;3680:11;:18;3676:22;;3659:639;;;3812:11;-1:-1:-1;;;;;3794:29:46;:11;3806:1;3794:14;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3794:14:46;:29;3790:498;;;3938:11;3950:18;;-1:-1:-1;;3950:22:46;;;3938:35;;;;;;;;;;;;;;;;3921:11;:14;;-1:-1:-1;;;;;3938:35:46;;;;3933:1;;3921:14;;;;;;;;;;;;;;;:52;;-1:-1:-1;;3921:52:46;-1:-1:-1;;;;;3921:52:46;;;;;;;;;;4040:11;:23;;-1:-1:-1;;4040:23:46;;;;;;:::i;:::-;-1:-1:-1;4143:107:46;;;4222:10;4143:107;;;;-1:-1:-1;;;;;4143:107:46;;;;;;;;;;;;;4268:5;;3790:498;3700:3;;3659:639;;;3324:980;;:::o;827:111:62:-;719:5;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:62;;;;884:25;;;931:1;915:18;;-1:-1:-1;;915:18:62;;;827:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:62;;:::o;4571:939:46:-;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;4809:11:46;:18;4841:19;;;;;;;;;;;;;;;;;;;;;;;;;4800:27;;4779:91;;;;-1:-1:-1;;;;;4779:91:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4779:91:46;;4999:11;-1:-1:-1;;;;;4976:34:46;:11;4988:6;4976:19;;;;;;;;;;;;;;;;;;;;;5024:22;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4976:19:46;;;:34;4955:101;;;;-1:-1:-1;;;;;4955:101:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4955:101:46;-1:-1:-1;;;;;;5124:23:46;;;;;;:10;:23;;;;;5117:30;;-1:-1:-1;;5117:30:46;;;5245:11;5257:18;;-1:-1:-1;;5257:22:46;;;5245:35;;;;;;;;;;;;;;;;5223:11;:19;;-1:-1:-1;;;;;5245:35:46;;;;5235:6;;5223:19;;;;;;;;;;;;;;;:57;;-1:-1:-1;;5223:57:46;-1:-1:-1;;;;;5223:57:46;;;;;;;;;;5333:11;:23;;-1:-1:-1;;5333:23:46;;;;;;:::i;:::-;-1:-1:-1;5420:83:46;;;5483:10;5420:83;;;;-1:-1:-1;;;;;5420:83:46;;;;;;;;;;;;;4571:939;;:::o;1634:43::-;;;;;;;;;;;;;;;:::o;5620:186::-;5701:9;5788:11;5781:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5781:18:46;;;;;;;;;;;;;;;;;;;;;;;5620:186;;:::o;1100:103:62:-;719:5;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1338:171::-;-1:-1:-1;;;;;1408:23:62;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:62;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;1487:17:62;-1:-1:-1;;;;;1487:17:62;;;;;;;;;;1338:171::o;963:4845:46:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\n\n\n/**\n * @title Authorizable\n * @author Set Protocol\n *\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\n * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.\n */\ncontract Authorizable is\n    Ownable\n{\n\n    /* ============ Constants ============ */\n\n    // Error messages\n    string constant SENDER_NOT_AUTHORIZED = \"Sender not authorized to call this method.\";\n    string constant TARGET_NOT_AUTHORIZED = \"Target address must be authorized.\";\n    string constant TARGET_ALREADY_AUTHORIZED = \"Target must not already be authorized.\";\n    string constant INDEX_OUT_OF_BOUNDS = \"Specified array index is out of bounds.\";\n    string constant INDEX_ADDRESS_MISMATCH = \"Address found at index does not match target.\";\n\n    /* ============ State Variables ============ */\n\n    // Mapping of addresses to bool indicator of authorization\n    mapping (address => bool) public authorized;\n\n    // Array of authorized addresses\n    address[] public authorities;\n\n    /* ============ Modifiers ============ */\n\n    // Only authorized addresses can invoke functions with this modifier.\n    modifier onlyAuthorized {\n        require(\n            authorized[msg.sender],\n            SENDER_NOT_AUTHORIZED\n        );\n        _;\n    }\n\n    /* ============ Events ============ */\n\n    // Event emitted when new address is authorized.\n    event AddressAuthorized (\n        address indexed authAddress,\n        address authorizedBy\n    );\n\n    // Event emitted when address is deauthorized.\n    event AuthorizedAddressRemoved (\n        address indexed addressRemoved,\n        address authorizedBy\n    );\n\n    /* ============ Setters ============ */\n\n    /**\n     * Add authorized address to contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address of the new authorized contract\n     */\n\n    function addAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require that address is not already authorized\n        require(\n            !authorized[_authTarget],\n            TARGET_ALREADY_AUTHORIZED\n        );\n\n        // Set address authority to true\n        authorized[_authTarget] = true;\n\n        // Add address to authorities array\n        authorities.push(_authTarget);\n\n        // Emit authorized address event\n        emit AddressAuthorized(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /**\n     * Remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     */\n\n    function removeAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require address is authorized\n        require(\n            authorized[_authTarget],\n            TARGET_NOT_AUTHORIZED\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        for (uint i = 0; i < authorities.length; i++) {\n\n            // Check if address in authorities matches target address\n            if (authorities[i] == _authTarget) {\n\n                // Set target address index value to address at end of array\n                authorities[i] = authorities[authorities.length - 1];\n\n                // Delete last address in array\n                authorities.length -= 1;\n\n                // Emit AuthorizedAddressRemoved event.\n                emit AuthorizedAddressRemoved(\n                    _authTarget,\n                    msg.sender\n                );\n                break;\n            }\n        }\n    }\n\n    /**\n     * More efficiently remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     * @param _index           The index of the _authTarget address in authorities\n     */\n\n    function removeAuthorizedAddressAtIndex(\n        address _authTarget,\n        uint256 _index\n    )\n        external\n        onlyOwner\n    {\n        // Require index is less than length of authorities\n        require(\n            _index < authorities.length,\n            INDEX_OUT_OF_BOUNDS\n        );\n\n        // Require address at index of authorities matches target address\n        require(\n            authorities[_index] == _authTarget,\n            INDEX_ADDRESS_MISMATCH\n        );\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        // Replace address at index with address at end of array\n        authorities[_index] = authorities[authorities.length - 1];\n\n        // Remove last address from array\n        authorities.length -= 1;\n\n        // Emit AuthorizedAddressRemoved event.\n        emit AuthorizedAddressRemoved(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /* ============ Getters ============ */\n\n    /**\n     * Get array of authorized addresses.\n     */\n\n    function getAuthorizedAddresses()\n        external\n        view\n        returns (address[] memory)\n    {\n        // Return array of authorized addresses\n        return authorities;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        5007
      ]
    },
    "id": 5008,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4794,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:46"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 4796,
        "nodeType": "ImportDirective",
        "scope": 5008,
        "sourceUnit": 6789,
        "src": "622:76:46",
        "symbolAliases": [
          {
            "foreign": 4795,
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
              "id": 4797,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6788,
              "src": "992:7:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6788",
                "typeString": "contract Ownable"
              }
            },
            "id": 4798,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:46"
          }
        ],
        "contractDependencies": [
          6788
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 5007,
        "linearizedBaseContracts": [
          5007,
          6788
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4801,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1076:84:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4799,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1076:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53656e646572206e6f7420617574686f72697a656420746f2063616c6c2074686973206d6574686f642e",
              "id": 4800,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1116:44:46",
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
            "id": 4804,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1166:76:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4802,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1166:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5461726765742061646472657373206d75737420626520617574686f72697a65642e",
              "id": 4803,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1206:36:46",
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
            "id": 4807,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1248:84:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4805,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1248:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "546172676574206d757374206e6f7420616c726561647920626520617574686f72697a65642e",
              "id": 4806,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1292:40:46",
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
            "id": 4810,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1338:79:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4808,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1338:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53706563696669656420617272617920696e646578206973206f7574206f6620626f756e64732e",
              "id": 4809,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1376:41:46",
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
            "id": 4813,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1423:88:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4811,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1423:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4164647265737320666f756e6420617420696e64657820646f6573206e6f74206d61746368207461726765742e",
              "id": 4812,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1464:47:46",
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
            "id": 4817,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1634:43:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4816,
              "keyType": {
                "id": 4814,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1643:7:46",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1634:25:46",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 4815,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1654:4:46",
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
            "id": 4820,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1721:28:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4818,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:46",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4819,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1721:9:46",
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
              "id": 4831,
              "nodeType": "Block",
              "src": "1901:116:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4823,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4817,
                          "src": "1932:10:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4826,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4824,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7255,
                            "src": "1943:3:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4825,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1943:10:46",
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
                        "src": "1932:22:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4827,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4801,
                        "src": "1968:21:46",
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
                      "id": 4822,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "1911:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4828,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1911:88:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4829,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:46"
                },
                {
                  "id": 4830,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:46"
                }
              ]
            },
            "documentation": null,
            "id": 4832,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4821,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1901:0:46"
            },
            "src": "1877:140:46",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4838,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4837,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4834,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "2154:27:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4833,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2154:7:46",
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
                  "id": 4836,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "2191:20:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4835,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2191:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2144:73:46"
            },
            "src": "2120:98:46"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4844,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4843,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4840,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4844,
                  "src": "2316:30:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4839,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:7:46",
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
                  "id": 4842,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4844,
                  "src": "2356:20:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4841,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2356:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2306:76:46"
            },
            "src": "2275:108:46"
          },
          {
            "body": {
              "id": 4877,
              "nodeType": "Block",
              "src": "2689:468:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4855,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2778:24:46",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4852,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4817,
                            "src": "2779:10:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4854,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4853,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4846,
                            "src": "2790:11:46",
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
                          "src": "2779:23:46",
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
                        "id": 4856,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4807,
                        "src": "2816:25:46",
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
                      "id": 4851,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "2757:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4857,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2757:94:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4858,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4863,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4859,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "2903:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4860,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "2914:11:46",
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
                      "src": "2903:23:46",
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
                      "id": 4862,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2929:4:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2903:30:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4864,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4868,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "3005:11:46",
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
                        "id": 4865,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "2988:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4867,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2988:16:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 4869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2988:29:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4870,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:46"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4872,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "3105:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4873,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7255,
                          "src": "3130:3:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4874,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3130:10:46",
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
                      "id": 4871,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4838,
                      "src": "3074:17:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4875,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3074:76:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4876,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:46"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4878,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4849,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4848,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2675:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2675:9:46"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4847,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4846,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4878,
                  "src": "2629:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4845,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2629:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2628:21:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4850,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:46"
            },
            "scope": 5007,
            "src": "2599:558:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4941,
              "nodeType": "Block",
              "src": "3417:887:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4886,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4817,
                          "src": "3489:10:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4888,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4887,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4880,
                          "src": "3500:11:46",
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
                        "src": "3489:23:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4889,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4804,
                        "src": "3526:21:46",
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
                      "id": 4885,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "3468:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4890,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3468:89:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4891,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4895,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3618:30:46",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4892,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "3625:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4894,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4893,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4880,
                        "src": "3636:11:46",
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
                      "src": "3625:23:46",
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
                  "id": 4896,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:46"
                },
                {
                  "body": {
                    "id": 4939,
                    "nodeType": "Block",
                    "src": "3705:593:46",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 4912,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4908,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4820,
                              "src": "3794:11:46",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4910,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4909,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4898,
                              "src": "3806:1:46",
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
                            "src": "3794:14:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4911,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4880,
                            "src": "3812:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3794:29:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4938,
                        "nodeType": "IfStatement",
                        "src": "3790:498:46",
                        "trueBody": {
                          "id": 4937,
                          "nodeType": "Block",
                          "src": "3825:463:46",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4922,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4913,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "3921:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4915,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4914,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4898,
                                    "src": "3933:1:46",
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
                                  "src": "3921:14:46",
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
                                    "id": 4916,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "3938:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4921,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4920,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4917,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4820,
                                        "src": "3950:11:46",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4918,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3950:18:46",
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
                                      "id": 4919,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3971:1:46",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3950:22:46",
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
                                  "src": "3938:35:46",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3921:52:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 4923,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:46"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4928,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4924,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "4040:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4926,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "4040:18:46",
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
                                  "id": 4927,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "4062:1:46",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "4040:23:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 4929,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:46"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4931,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4880,
                                    "src": "4189:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 4932,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 7255,
                                      "src": "4222:3:46",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4933,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "4222:10:46",
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
                                  "id": 4930,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4844,
                                  "src": "4143:24:46",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4934,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "4143:107:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_tuple$__$",
                                  "typeString": "tuple()"
                                }
                              },
                              "id": 4935,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:46"
                            },
                            {
                              "id": 4936,
                              "nodeType": "Break",
                              "src": "4268:5:46"
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
                    "id": 4904,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4901,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4898,
                      "src": "3676:1:46",
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
                        "id": 4902,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "3680:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4903,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3680:18:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3676:22:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4940,
                  "initializationExpression": {
                    "assignments": [
                      4898
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4898,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4942,
                        "src": "3664:6:46",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4897,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3664:4:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 4900,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4899,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3673:1:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3664:10:46"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 4906,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3700:3:46",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 4905,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4898,
                        "src": "3700:1:46",
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
                    "id": 4907,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:46"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:46"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4942,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4883,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4882,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "3403:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3403:9:46"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4881,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4880,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4942,
                  "src": "3357:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4879,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3357:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3356:21:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4884,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:46"
            },
            "scope": 5007,
            "src": "3324:980:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4996,
              "nodeType": "Block",
              "src": "4709:801:46",
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
                        "id": 4955,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4952,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4946,
                          "src": "4800:6:46",
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
                            "id": 4953,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "4809:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4954,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4809:18:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4800:27:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4956,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4810,
                        "src": "4841:19:46",
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
                      "id": 4951,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "4779:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4957,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:91:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4958,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:91:46"
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
                        "id": 4964,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4960,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "4976:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4962,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4961,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4946,
                            "src": "4988:6:46",
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
                          "src": "4976:19:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4963,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4944,
                          "src": "4999:11:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4976:34:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4965,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4813,
                        "src": "5024:22:46",
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
                      "id": 4959,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "4955:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4966,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4955:101:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4967,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4971,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "5117:30:46",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4968,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "5124:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4970,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4969,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4944,
                        "src": "5135:11:46",
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
                      "src": "5124:23:46",
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
                  "id": 4972,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4982,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4973,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5223:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4975,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4974,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4946,
                        "src": "5235:6:46",
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
                      "src": "5223:19:46",
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
                        "id": 4976,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5245:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4981,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4980,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4977,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "5257:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4978,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5257:18:46",
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
                          "id": 4979,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5278:1:46",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "src": "5257:22:46",
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
                      "src": "5245:35:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5223:57:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4983,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4988,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4984,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5333:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4986,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5333:18:46",
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
                      "id": 4987,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5355:1:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5333:23:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4989,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:46"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4991,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4944,
                        "src": "5458:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4992,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7255,
                          "src": "5483:3:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4993,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5483:10:46",
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
                      "id": 4990,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4844,
                      "src": "5420:24:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4994,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5420:83:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4995,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:46"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4997,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4949,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4948,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "4695:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4695:9:46"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4947,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4944,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4997,
                  "src": "4620:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4943,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4620:7:46",
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
                  "id": 4946,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4997,
                  "src": "4649:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4945,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4649:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4610:59:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4950,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:46"
            },
            "scope": 5007,
            "src": "4571:939:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5005,
              "nodeType": "Block",
              "src": "5723:83:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5003,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4820,
                    "src": "5788:11:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 5002,
                  "id": 5004,
                  "nodeType": "Return",
                  "src": "5781:18:46"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 5006,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4998,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 5002,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5001,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5006,
                  "src": "5701:9:46",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4999,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5000,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5701:9:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5700:18:46"
            },
            "scope": 5007,
            "src": "5620:186:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5008,
        "src": "963:4845:46"
      }
    ],
    "src": "597:5212:46"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        5007
      ]
    },
    "id": 5008,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 4794,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:46"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 4796,
        "nodeType": "ImportDirective",
        "scope": 5008,
        "sourceUnit": 6789,
        "src": "622:76:46",
        "symbolAliases": [
          {
            "foreign": 4795,
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
              "id": 4797,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6788,
              "src": "992:7:46",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6788",
                "typeString": "contract Ownable"
              }
            },
            "id": 4798,
            "nodeType": "InheritanceSpecifier",
            "src": "992:7:46"
          }
        ],
        "contractDependencies": [
          6788
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 5007,
        "linearizedBaseContracts": [
          5007,
          6788
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": true,
            "id": 4801,
            "name": "SENDER_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1076:84:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4799,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1076:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53656e646572206e6f7420617574686f72697a656420746f2063616c6c2074686973206d6574686f642e",
              "id": 4800,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1116:44:46",
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
            "id": 4804,
            "name": "TARGET_NOT_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1166:76:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4802,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1166:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5461726765742061646472657373206d75737420626520617574686f72697a65642e",
              "id": 4803,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1206:36:46",
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
            "id": 4807,
            "name": "TARGET_ALREADY_AUTHORIZED",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1248:84:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4805,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1248:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "546172676574206d757374206e6f7420616c726561647920626520617574686f72697a65642e",
              "id": 4806,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1292:40:46",
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
            "id": 4810,
            "name": "INDEX_OUT_OF_BOUNDS",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1338:79:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4808,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1338:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "53706563696669656420617272617920696e646578206973206f7574206f6620626f756e64732e",
              "id": 4809,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1376:41:46",
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
            "id": 4813,
            "name": "INDEX_ADDRESS_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1423:88:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 4811,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1423:6:46",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "4164647265737320666f756e6420617420696e64657820646f6573206e6f74206d61746368207461726765742e",
              "id": 4812,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1464:47:46",
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
            "id": 4817,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1634:43:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 4816,
              "keyType": {
                "id": 4814,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1643:7:46",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1634:25:46",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 4815,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1654:4:46",
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
            "id": 4820,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 5007,
            "src": "1721:28:46",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 4818,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1721:7:46",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 4819,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1721:9:46",
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
              "id": 4831,
              "nodeType": "Block",
              "src": "1901:116:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4823,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4817,
                          "src": "1932:10:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4826,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4824,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7255,
                            "src": "1943:3:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 4825,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1943:10:46",
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
                        "src": "1932:22:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4827,
                        "name": "SENDER_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4801,
                        "src": "1968:21:46",
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
                      "id": 4822,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "1911:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4828,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1911:88:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4829,
                  "nodeType": "ExpressionStatement",
                  "src": "1911:88:46"
                },
                {
                  "id": 4830,
                  "nodeType": "PlaceholderStatement",
                  "src": "2009:1:46"
                }
              ]
            },
            "documentation": null,
            "id": 4832,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 4821,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1901:0:46"
            },
            "src": "1877:140:46",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4838,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4837,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4834,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "2154:27:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4833,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2154:7:46",
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
                  "id": 4836,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4838,
                  "src": "2191:20:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4835,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2191:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2144:73:46"
            },
            "src": "2120:98:46"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 4844,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 4843,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4840,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 4844,
                  "src": "2316:30:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4839,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2316:7:46",
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
                  "id": 4842,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 4844,
                  "src": "2356:20:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4841,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2356:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2306:76:46"
            },
            "src": "2275:108:46"
          },
          {
            "body": {
              "id": 4877,
              "nodeType": "Block",
              "src": "2689:468:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4855,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2778:24:46",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4852,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4817,
                            "src": "2779:10:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 4854,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4853,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4846,
                            "src": "2790:11:46",
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
                          "src": "2779:23:46",
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
                        "id": 4856,
                        "name": "TARGET_ALREADY_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4807,
                        "src": "2816:25:46",
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
                      "id": 4851,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "2757:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4857,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2757:94:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4858,
                  "nodeType": "ExpressionStatement",
                  "src": "2757:94:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4863,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4859,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "2903:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4860,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "2914:11:46",
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
                      "src": "2903:23:46",
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
                      "id": 4862,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2929:4:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2903:30:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4864,
                  "nodeType": "ExpressionStatement",
                  "src": "2903:30:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4868,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "3005:11:46",
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
                        "id": 4865,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "2988:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4867,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2988:16:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 4869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2988:29:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4870,
                  "nodeType": "ExpressionStatement",
                  "src": "2988:29:46"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4872,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4846,
                        "src": "3105:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4873,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7255,
                          "src": "3130:3:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4874,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3130:10:46",
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
                      "id": 4871,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4838,
                      "src": "3074:17:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4875,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3074:76:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4876,
                  "nodeType": "EmitStatement",
                  "src": "3069:81:46"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 4878,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4849,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4848,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2675:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2675:9:46"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4847,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4846,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4878,
                  "src": "2629:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4845,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2629:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2628:21:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4850,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2689:0:46"
            },
            "scope": 5007,
            "src": "2599:558:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4941,
              "nodeType": "Block",
              "src": "3417:887:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 4886,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4817,
                          "src": "3489:10:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 4888,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 4887,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4880,
                          "src": "3500:11:46",
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
                        "src": "3489:23:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4889,
                        "name": "TARGET_NOT_AUTHORIZED",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4804,
                        "src": "3526:21:46",
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
                      "id": 4885,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "3468:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4890,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3468:89:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4891,
                  "nodeType": "ExpressionStatement",
                  "src": "3468:89:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4895,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3618:30:46",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4892,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "3625:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4894,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4893,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4880,
                        "src": "3636:11:46",
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
                      "src": "3625:23:46",
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
                  "id": 4896,
                  "nodeType": "ExpressionStatement",
                  "src": "3618:30:46"
                },
                {
                  "body": {
                    "id": 4939,
                    "nodeType": "Block",
                    "src": "3705:593:46",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 4912,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "id": 4908,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4820,
                              "src": "3794:11:46",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 4910,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 4909,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 4898,
                              "src": "3806:1:46",
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
                            "src": "3794:14:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 4911,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4880,
                            "src": "3812:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3794:29:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 4938,
                        "nodeType": "IfStatement",
                        "src": "3790:498:46",
                        "trueBody": {
                          "id": 4937,
                          "nodeType": "Block",
                          "src": "3825:463:46",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4922,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "baseExpression": {
                                    "argumentTypes": null,
                                    "id": 4913,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "3921:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4915,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 4914,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4898,
                                    "src": "3933:1:46",
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
                                  "src": "3921:14:46",
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
                                    "id": 4916,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "3938:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4921,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 4920,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "id": 4917,
                                        "name": "authorities",
                                        "nodeType": "Identifier",
                                        "overloadedDeclarations": [],
                                        "referencedDeclaration": 4820,
                                        "src": "3950:11:46",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 4918,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3950:18:46",
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
                                      "id": 4919,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3971:1:46",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3950:22:46",
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
                                  "src": "3938:35:46",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3921:52:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 4923,
                              "nodeType": "ExpressionStatement",
                              "src": "3921:52:46"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 4928,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "id": 4924,
                                    "name": "authorities",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4820,
                                    "src": "4040:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 4926,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "4040:18:46",
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
                                  "id": 4927,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "4062:1:46",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "4040:23:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 4929,
                              "nodeType": "ExpressionStatement",
                              "src": "4040:23:46"
                            },
                            {
                              "eventCall": {
                                "argumentTypes": null,
                                "arguments": [
                                  {
                                    "argumentTypes": null,
                                    "id": 4931,
                                    "name": "_authTarget",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 4880,
                                    "src": "4189:11:46",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  },
                                  {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 4932,
                                      "name": "msg",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 7255,
                                      "src": "4222:3:46",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_magic_message",
                                        "typeString": "msg"
                                      }
                                    },
                                    "id": 4933,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "sender",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": null,
                                    "src": "4222:10:46",
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
                                  "id": 4930,
                                  "name": "AuthorizedAddressRemoved",
                                  "nodeType": "Identifier",
                                  "overloadedDeclarations": [],
                                  "referencedDeclaration": 4844,
                                  "src": "4143:24:46",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                                    "typeString": "function (address,address)"
                                  }
                                },
                                "id": 4934,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "kind": "functionCall",
                                "lValueRequested": false,
                                "names": [],
                                "nodeType": "FunctionCall",
                                "src": "4143:107:46",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_tuple$__$",
                                  "typeString": "tuple()"
                                }
                              },
                              "id": 4935,
                              "nodeType": "EmitStatement",
                              "src": "4138:112:46"
                            },
                            {
                              "id": 4936,
                              "nodeType": "Break",
                              "src": "4268:5:46"
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
                    "id": 4904,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 4901,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4898,
                      "src": "3676:1:46",
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
                        "id": 4902,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "3680:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4903,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3680:18:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3676:22:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 4940,
                  "initializationExpression": {
                    "assignments": [
                      4898
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 4898,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 4942,
                        "src": "3664:6:46",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 4897,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3664:4:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 4900,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 4899,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3673:1:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3664:10:46"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 4906,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3700:3:46",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 4905,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4898,
                        "src": "3700:1:46",
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
                    "id": 4907,
                    "nodeType": "ExpressionStatement",
                    "src": "3700:3:46"
                  },
                  "nodeType": "ForStatement",
                  "src": "3659:639:46"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 4942,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4883,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4882,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "3403:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3403:9:46"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4881,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4880,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4942,
                  "src": "3357:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4879,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3357:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3356:21:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4884,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3417:0:46"
            },
            "scope": 5007,
            "src": "3324:980:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 4996,
              "nodeType": "Block",
              "src": "4709:801:46",
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
                        "id": 4955,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 4952,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4946,
                          "src": "4800:6:46",
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
                            "id": 4953,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "4809:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4954,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4809:18:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4800:27:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4956,
                        "name": "INDEX_OUT_OF_BOUNDS",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4810,
                        "src": "4841:19:46",
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
                      "id": 4951,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "4779:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4957,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:91:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4958,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:91:46"
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
                        "id": 4964,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 4960,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "4976:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4962,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 4961,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4946,
                            "src": "4988:6:46",
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
                          "src": "4976:19:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 4963,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4944,
                          "src": "4999:11:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4976:34:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 4965,
                        "name": "INDEX_ADDRESS_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4813,
                        "src": "5024:22:46",
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
                      "id": 4959,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7258,
                        7259
                      ],
                      "referencedDeclaration": 7259,
                      "src": "4955:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 4966,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4955:101:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4967,
                  "nodeType": "ExpressionStatement",
                  "src": "4955:101:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4971,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "5117:30:46",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4968,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4817,
                        "src": "5124:10:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 4970,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4969,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4944,
                        "src": "5135:11:46",
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
                      "src": "5124:23:46",
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
                  "id": 4972,
                  "nodeType": "ExpressionStatement",
                  "src": "5117:30:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4982,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 4973,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5223:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4975,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 4974,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4946,
                        "src": "5235:6:46",
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
                      "src": "5223:19:46",
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
                        "id": 4976,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5245:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4981,
                      "indexExpression": {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 4980,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 4977,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4820,
                            "src": "5257:11:46",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 4978,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5257:18:46",
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
                          "id": 4979,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5278:1:46",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        },
                        "src": "5257:22:46",
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
                      "src": "5245:35:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "5223:57:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 4983,
                  "nodeType": "ExpressionStatement",
                  "src": "5223:57:46"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 4988,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 4984,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4820,
                        "src": "5333:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 4986,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5333:18:46",
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
                      "id": 4987,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "5355:1:46",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_1_by_1",
                        "typeString": "int_const 1"
                      },
                      "value": "1"
                    },
                    "src": "5333:23:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 4989,
                  "nodeType": "ExpressionStatement",
                  "src": "5333:23:46"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 4991,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4944,
                        "src": "5458:11:46",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 4992,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7255,
                          "src": "5483:3:46",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 4993,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5483:10:46",
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
                      "id": 4990,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 4844,
                      "src": "5420:24:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 4994,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5420:83:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 4995,
                  "nodeType": "EmitStatement",
                  "src": "5415:88:46"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 4997,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 4949,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 4948,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "4695:9:46",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4695:9:46"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4947,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 4944,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 4997,
                  "src": "4620:19:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 4943,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4620:7:46",
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
                  "id": 4946,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 4997,
                  "src": "4649:14:46",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 4945,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4649:7:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4610:59:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 4950,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4709:0:46"
            },
            "scope": 5007,
            "src": "4571:939:46",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5005,
              "nodeType": "Block",
              "src": "5723:83:46",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5003,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 4820,
                    "src": "5788:11:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 5002,
                  "id": 5004,
                  "nodeType": "Return",
                  "src": "5781:18:46"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.",
            "id": 5006,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4998,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5651:2:46"
            },
            "payable": false,
            "returnParameters": {
              "id": 5002,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5001,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5006,
                  "src": "5701:9:46",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 4999,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5701:7:46",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5000,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5701:9:46",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5700:18:46"
            },
            "scope": 5007,
            "src": "5620:186:46",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5008,
        "src": "963:4845:46"
      }
    ],
    "src": "597:5212:46"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.833Z"
}