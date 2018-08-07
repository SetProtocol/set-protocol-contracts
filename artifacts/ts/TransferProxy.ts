export const TransferProxy = 
{
  "contractName": "TransferProxy",
  "abi": [
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
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610de8806100256000396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063a6c4e4671461016e578063b91816111461019f578063d39de6e9146101d4578063f2fde38b14610239575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a036004351661025a565b005b3480156100d757600080fd5b506100e3600435610421565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a0360043516610449565b34801561012c57600080fd5b506100c9610662565b34801561014157600080fd5b506100e36106ce565b34801561015657600080fd5b506100c9600160a060020a03600435166024356106dd565b34801561017a57600080fd5b506100c9600160a060020a03600435811690602435906044358116906064351661096a565b3480156101ab57600080fd5b506101c0600160a060020a0360043516610c4a565b604080519115158252519081900360200190f35b3480156101e057600080fd5b506101e9610c5f565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022557818101518382015260200161020d565b505050509050019250505060405180910390f35b34801561024557600080fd5b506100c9600160a060020a0360043516610cc2565b600054600160a060020a0316331461027157600080fd5b600160a060020a038116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff161561037a5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561033f578181015183820152602001610327565b50505050905090810190601f16801561036c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061042f57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461046157600080fd5b600160a060020a038216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff16151561052f5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b5050600160a060020a0381166000908152600160205260408120805460ff191690555b60025481101561065e5781600160a060020a031660028281548110151561057557fe5b600091825260209091200154600160a060020a03161415610656576002805460001981019081106105a257fe5b60009182526020909120015460028054600160a060020a0390921691839081106105c857fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906106119082610d75565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a261065e565b600101610552565b5050565b600054600160a060020a0316331461067957600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a031633146106f457600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106107a55760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b5081600160a060020a03166002828154811015156107bf57fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e00000000000000000000000000000000000000908301529091600160a060020a03909116146108845760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b50600160a060020a0382166000908152600160205260409020805460ff191690556002805460001981019081106108b757fe5b60009182526020909120015460028054600160a060020a0390921691839081106108dd57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906109269082610d75565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b336000908152600160209081526040808320548151606081018352602a81527f53656e646572206e6f7420617574686f72697a656420746f2063616c6c207468938101939093527f6973206d6574686f642e000000000000000000000000000000000000000000009183019190915282919060ff161515610a305760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b50604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808916600483015285166024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b158015610aac57600080fd5b505af4158015610ac0573d6000803e3d6000fd5b505050506040513d6020811015610ad657600080fd5b5051604080517f15dacbea000000000000000000000000000000000000000000000000000000008152600160a060020a03808a16600483015280881660248301528616604482015260648101889052905191935073__ERC20Wrapper__________________________916315dacbea91608480820192600092909190829003018186803b158015610b6657600080fd5b505af4158015610b7a573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808b16600483015287166024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b158015610bf957600080fd5b505af4158015610c0d573d6000803e3d6000fd5b505050506040513d6020811015610c2357600080fd5b50519050610c37828663ffffffff610ce516565b8114610c4257600080fd5b505050505050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610cb757602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610c99575b505050505090505b90565b600054600160a060020a03163314610cd957600080fd5b610ce281610cf8565b50565b81810182811015610cf257fe5b92915050565b600160a060020a0381161515610d0d57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610d9957600083815260209020610d99918101908301610d9e565b505050565b610cbf91905b80821115610db85760008155600101610da4565b50905600a165627a7a72305820c036cfdfcab28e76972b228b9dd77bb3a6de3dfce82da5222d431bf27d41ab690029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063a6c4e4671461016e578063b91816111461019f578063d39de6e9146101d4578063f2fde38b14610239575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a036004351661025a565b005b3480156100d757600080fd5b506100e3600435610421565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a0360043516610449565b34801561012c57600080fd5b506100c9610662565b34801561014157600080fd5b506100e36106ce565b34801561015657600080fd5b506100c9600160a060020a03600435166024356106dd565b34801561017a57600080fd5b506100c9600160a060020a03600435811690602435906044358116906064351661096a565b3480156101ab57600080fd5b506101c0600160a060020a0360043516610c4a565b604080519115158252519081900360200190f35b3480156101e057600080fd5b506101e9610c5f565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022557818101518382015260200161020d565b505050509050019250505060405180910390f35b34801561024557600080fd5b506100c9600160a060020a0360043516610cc2565b600054600160a060020a0316331461027157600080fd5b600160a060020a038116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff161561037a5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561033f578181015183820152602001610327565b50505050905090810190601f16801561036c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061042f57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461046157600080fd5b600160a060020a038216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff16151561052f5760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b5050600160a060020a0381166000908152600160205260408120805460ff191690555b60025481101561065e5781600160a060020a031660028281548110151561057557fe5b600091825260209091200154600160a060020a03161415610656576002805460001981019081106105a257fe5b60009182526020909120015460028054600160a060020a0390921691839081106105c857fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906106119082610d75565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a261065e565b600101610552565b5050565b600054600160a060020a0316331461067957600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a031633146106f457600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106107a55760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b5081600160a060020a03166002828154811015156107bf57fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e00000000000000000000000000000000000000908301529091600160a060020a03909116146108845760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b50600160a060020a0382166000908152600160205260409020805460ff191690556002805460001981019081106108b757fe5b60009182526020909120015460028054600160a060020a0390921691839081106108dd57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790556002805460001901906109269082610d75565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b336000908152600160209081526040808320548151606081018352602a81527f53656e646572206e6f7420617574686f72697a656420746f2063616c6c207468938101939093527f6973206d6574686f642e000000000000000000000000000000000000000000009183019190915282919060ff161515610a305760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360008381101561033f578181015183820152602001610327565b50604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808916600483015285166024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b158015610aac57600080fd5b505af4158015610ac0573d6000803e3d6000fd5b505050506040513d6020811015610ad657600080fd5b5051604080517f15dacbea000000000000000000000000000000000000000000000000000000008152600160a060020a03808a16600483015280881660248301528616604482015260648101889052905191935073__ERC20Wrapper__________________________916315dacbea91608480820192600092909190829003018186803b158015610b6657600080fd5b505af4158015610b7a573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808b16600483015287166024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b158015610bf957600080fd5b505af4158015610c0d573d6000803e3d6000fd5b505050506040513d6020811015610c2357600080fd5b50519050610c37828663ffffffff610ce516565b8114610c4257600080fd5b505050505050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610cb757602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610c99575b505050505090505b90565b600054600160a060020a03163314610cd957600080fd5b610ce281610cf8565b50565b81810182811015610cf257fe5b92915050565b600160a060020a0381161515610d0d57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610d9957600083815260209020610d99918101908301610d9e565b505050565b610cbf91905b80821115610db85760008155600101610da4565b50905600a165627a7a72305820c036cfdfcab28e76972b228b9dd77bb3a6de3dfce82da5222d431bf27d41ab690029",
  "sourceMap": "1008:1354:4:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;1008:1354:4;;;;;;",
  "deployedSourceMap": "1008:1354:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:558:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2599:558:45;-1:-1:-1;;;;;2599:558:45;;;;;;;1721:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1721:28:45;;;;;;;;;-1:-1:-1;;;;;1721:28:45;;;;;;;;;;;;;;3324:980;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3324:980:45;-1:-1:-1;;;;;3324:980:45;;;;;827:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;4571:939:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4571:939:45;-1:-1:-1;;;;;4571:939:45;;;;;;;1548:812:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1548:812:4;-1:-1:-1;;;;;1548:812:4;;;;;;;;;;;;;;;;;;1634:43:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1634:43:45;-1:-1:-1;;;;;1634:43:45;;;;;;;;;;;;;;;;;;;;;;;5620:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5620:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5620:186:45;;;;;;;;;;;;;;;;;1100:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;-1:-1:-1;;;;;1100:103:61;;;;;2599:558:45;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2779:23:45;;;;;;:10;:23;;;;;;;;;;2816:25;;;;;;;;;;;;;;;;;;;;;;;;;;;2779:23;;2778:24;2757:94;;;;-1:-1:-1;;;;;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;;2903:23:45;;;;;;2929:4;2903:23;;;;;;;;:30;;-1:-1:-1;;2903:30:45;;;;;2988:11;27:10:-1;;23:18;;;45:23;;2988:29:45;;;;;;;;;-1:-1:-1;;2988:29:45;;;;;3074:76;;3130:10;3074:76;;;;;;;;;;;;;;2599:558;:::o;1721:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1721:28:45;;-1:-1:-1;1721:28:45;:::o;3324:980::-;3664:6;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;3489:23:45;;;;;;:10;:23;;;;;;;;;;3526:21;;;;;;;;;;;;;;;;;;;;;;;;;;;3489:23;;3468:89;;;;;;-1:-1:-1;;;;;3468:89:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;3468:89:45;-1:-1:-1;;;;;;;3625:23:45;;;;;;:10;:23;;;;;3618:30;;-1:-1:-1;;3618:30:45;;;3659:639;3680:11;:18;3676:22;;3659:639;;;3812:11;-1:-1:-1;;;;;3794:29:45;:11;3806:1;3794:14;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3794:14:45;:29;3790:498;;;3938:11;3950:18;;-1:-1:-1;;3950:22:45;;;3938:35;;;;;;;;;;;;;;;;3921:11;:14;;-1:-1:-1;;;;;3938:35:45;;;;3933:1;;3921:14;;;;;;;;;;;;;;;:52;;-1:-1:-1;;3921:52:45;-1:-1:-1;;;;;3921:52:45;;;;;;;;;;4040:11;:23;;-1:-1:-1;;4040:23:45;;;;;;:::i;:::-;-1:-1:-1;4143:107:45;;;4222:10;4143:107;;;;-1:-1:-1;;;;;4143:107:45;;;;;;;;;;;;;4268:5;;3790:498;3700:3;;3659:639;;;3324:980;;:::o;827:111:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:61;;;;884:25;;;931:1;915:18;;-1:-1:-1;;915:18:61;;;827:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:61;;:::o;4571:939:45:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;4809:11:45;:18;4841:19;;;;;;;;;;;;;;;;;;;;;;;;;4800:27;;4779:91;;;;-1:-1:-1;;;;;4779:91:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4779:91:45;;4999:11;-1:-1:-1;;;;;4976:34:45;:11;4988:6;4976:19;;;;;;;;;;;;;;;;;;;;;5024:22;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4976:19:45;;;:34;4955:101;;;;-1:-1:-1;;;;;4955:101:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4955:101:45;-1:-1:-1;;;;;;5124:23:45;;;;;;:10;:23;;;;;5117:30;;-1:-1:-1;;5117:30:45;;;5245:11;5257:18;;-1:-1:-1;;5257:22:45;;;5245:35;;;;;;;;;;;;;;;;5223:11;:19;;-1:-1:-1;;;;;5245:35:45;;;;5235:6;;5223:19;;;;;;;;;;;;;;;:57;;-1:-1:-1;;5223:57:45;-1:-1:-1;;;;;5223:57:45;;;;;;;;;;5333:11;:23;;-1:-1:-1;;5333:23:45;;;;;;:::i;:::-;-1:-1:-1;5420:83:45;;;5483:10;5420:83;;;;-1:-1:-1;;;;;5420:83:45;;;;;;;;;;;;;4571:939;;:::o;1548:812:4:-;1943:10:45;1780:20:4;1932:22:45;;;:10;:22;;;;;;;;;1968:21;;;;;;;;;;;;;;;;;;;;;;;;;;1780:20:4;;1968:21:45;1932:22;;1911:88;;;;;;-1:-1:-1;;;;;1911:88:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1911:88:45;-1:-1:-1;1803:69:4;;;;;;-1:-1:-1;;;;;1803:69:4;;;;;;;;;;;;;;;:12;;:22;;:69;;;;;;;;;;;;;;:12;:69;;;5:2:-1;;;;30:1;27;20:12;5:2;1803:69:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1803:69:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1803:69:4;1956:114;;;;;;-1:-1:-1;;;;;1956:114:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;1803:69;;-1:-1:-1;1956:12:4;;:25;;:114;;;;;-1:-1:-1;;1956:114:4;;;;;;;;:12;:114;;;5:2:-1;;;;30:1;27;20:12;5:2;1956:114:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;2160:69:4;;;;;;-1:-1:-1;;;;;2160:69:4;;;;;;;;;;;;;;;:12;;-1:-1:-1;2160:22:4;;-1:-1:-1;2160:69:4;;;;;;;;;;;;;;:12;:69;;;5:2:-1;;;;30:1;27;20:12;5:2;2160:69:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2160:69:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2160:69:4;;-1:-1:-1;2322:30:4;:15;2342:9;2322:30;:19;:30;:::i;:::-;2308:44;;2300:53;;;;;;1548:812;;;;;;:::o;1634:43:45:-;;;;;;;;;;;;;;;:::o;5620:186::-;5701:9;5788:11;5781:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5781:18:45;;;;;;;;;;;;;;;;;;;;;;;5620:186;;:::o;1100:103:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1214:123:60:-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o;1338:171:61:-;-1:-1:-1;;;;;1408:23:61;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:61;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;1487:17:61;-1:-1:-1;;;;;1487:17:61;;;;;;;;;;1338:171::o;1008:1354:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { Authorizable } from \"../lib/Authorizable.sol\";\nimport { ERC20Wrapper } from \"../lib/ERC20Wrapper.sol\";\n\n\n/**\n * @title TransferProxy\n * @author Set Protocol\n *\n * The transferProxy contract is responsible for moving tokens through the system to\n * assist with issuance and filling issuance orders.\n */\n\ncontract TransferProxy is\n    Authorizable\n{\n    using SafeMath for uint256;\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     */\n    function transfer(\n        address _token,\n        uint _quantity,\n        address _from,\n        address _to\n    )\n        external\n        onlyAuthorized\n    {\n        // Retrieve current balance of token for the receiver\n        uint existingBalance = ERC20Wrapper.balanceOf(\n            _token,\n            _to\n        );\n\n        // Call specified ERC20 contract to transfer tokens (via proxy).\n        ERC20Wrapper.transferFrom(\n            _token,\n            _from,\n            _to,\n            _quantity\n        );\n\n        // Get new balance of transferred token for receiver\n        uint newBalance = ERC20Wrapper.balanceOf(\n            _token,\n            _to\n        );\n\n        // Verify transfer quantity is reflected in balance\n        require(newBalance == existingBalance.add(_quantity));\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/TransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        667
      ]
    },
    "id": 668,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 607,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 609,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 6421,
        "src": "622:73:4",
        "symbolAliases": [
          {
            "foreign": 608,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 611,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 4750,
        "src": "696:55:4",
        "symbolAliases": [
          {
            "foreign": 610,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 613,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 4931,
        "src": "752:55:4",
        "symbolAliases": [
          {
            "foreign": 612,
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
              "id": 614,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4749,
              "src": "1038:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$4749",
                "typeString": "contract Authorizable"
              }
            },
            "id": 615,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:12:4"
          }
        ],
        "contractDependencies": [
          4749,
          6506
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The transferProxy contract is responsible for moving tokens through the system to\nassist with issuance and filling issuance orders.",
        "fullyImplemented": true,
        "id": 667,
        "linearizedBaseContracts": [
          667,
          4749,
          6506
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 618,
            "libraryName": {
              "contractScope": null,
              "id": 616,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6420,
              "src": "1063:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6420",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1057:27:4",
            "typeName": {
              "id": 617,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1076:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 665,
              "nodeType": "Block",
              "src": "1708:652:4",
              "statements": [
                {
                  "assignments": [
                    632
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 632,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 666,
                      "src": "1780:20:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 631,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1780:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 638,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 635,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "1839:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 636,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "1859:3:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 633,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "1803:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 634,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4789,
                      "src": "1803:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 637,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1803:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1780:92:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 642,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "1995:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 624,
                        "src": "2015:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 644,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "2034:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 645,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 622,
                        "src": "2051:9:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 639,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "1956:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 641,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4858,
                      "src": "1956:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 646,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1956:114:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 647,
                  "nodeType": "ExpressionStatement",
                  "src": "1956:114:4"
                },
                {
                  "assignments": [
                    649
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 649,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 666,
                      "src": "2142:15:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 648,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "2142:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 655,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 652,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "2196:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 653,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "2216:3:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 650,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "2160:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 651,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4789,
                      "src": "2160:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 654,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2160:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2142:87:4"
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
                          "id": 657,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 649,
                          "src": "2308:10:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 660,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 622,
                              "src": "2342:9:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 658,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 632,
                              "src": "2322:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 659,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6419,
                            "src": "2322:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 661,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2322:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2308:44:4",
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
                      "id": 656,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6976,
                        6977
                      ],
                      "referencedDeclaration": 6976,
                      "src": "2300:7:4",
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
                    "src": "2300:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 664,
                  "nodeType": "ExpressionStatement",
                  "src": "2300:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 666,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 629,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 628,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4574,
                  "src": "1689:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1689:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 620,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1575:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 619,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1575:7:4",
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
                  "id": 622,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1599:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 621,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1599:4:4",
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
                  "id": 624,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1623:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 623,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1623:7:4",
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
                  "id": 626,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1646:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1646:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1565:98:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 630,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1708:0:4"
            },
            "scope": 667,
            "src": "1548:812:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 668,
        "src": "1008:1354:4"
      }
    ],
    "src": "597:1766:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        667
      ]
    },
    "id": 668,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 607,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 609,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 6421,
        "src": "622:73:4",
        "symbolAliases": [
          {
            "foreign": 608,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 611,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 4750,
        "src": "696:55:4",
        "symbolAliases": [
          {
            "foreign": 610,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 613,
        "nodeType": "ImportDirective",
        "scope": 668,
        "sourceUnit": 4931,
        "src": "752:55:4",
        "symbolAliases": [
          {
            "foreign": 612,
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
              "id": 614,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4749,
              "src": "1038:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$4749",
                "typeString": "contract Authorizable"
              }
            },
            "id": 615,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:12:4"
          }
        ],
        "contractDependencies": [
          4749,
          6506
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The transferProxy contract is responsible for moving tokens through the system to\nassist with issuance and filling issuance orders.",
        "fullyImplemented": true,
        "id": 667,
        "linearizedBaseContracts": [
          667,
          4749,
          6506
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 618,
            "libraryName": {
              "contractScope": null,
              "id": 616,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6420,
              "src": "1063:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6420",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1057:27:4",
            "typeName": {
              "id": 617,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1076:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 665,
              "nodeType": "Block",
              "src": "1708:652:4",
              "statements": [
                {
                  "assignments": [
                    632
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 632,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 666,
                      "src": "1780:20:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 631,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1780:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 638,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 635,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "1839:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 636,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "1859:3:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 633,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "1803:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 634,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4789,
                      "src": "1803:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 637,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1803:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1780:92:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 642,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "1995:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 624,
                        "src": "2015:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 644,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "2034:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 645,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 622,
                        "src": "2051:9:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 639,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "1956:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 641,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4858,
                      "src": "1956:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 646,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1956:114:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 647,
                  "nodeType": "ExpressionStatement",
                  "src": "1956:114:4"
                },
                {
                  "assignments": [
                    649
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 649,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 666,
                      "src": "2142:15:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 648,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "2142:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 655,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 652,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 620,
                        "src": "2196:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 653,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 626,
                        "src": "2216:3:4",
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 650,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4930,
                        "src": "2160:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4930_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 651,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4789,
                      "src": "2160:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 654,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2160:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2142:87:4"
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
                          "id": 657,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 649,
                          "src": "2308:10:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 660,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 622,
                              "src": "2342:9:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 658,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 632,
                              "src": "2322:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 659,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6419,
                            "src": "2322:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 661,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2322:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2308:44:4",
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
                      "id": 656,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6976,
                        6977
                      ],
                      "referencedDeclaration": 6976,
                      "src": "2300:7:4",
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
                    "src": "2300:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 664,
                  "nodeType": "ExpressionStatement",
                  "src": "2300:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 666,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 629,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 628,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4574,
                  "src": "1689:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1689:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 627,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 620,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1575:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 619,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1575:7:4",
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
                  "id": 622,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1599:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 621,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1599:4:4",
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
                  "id": 624,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1623:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 623,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1623:7:4",
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
                  "id": 626,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 666,
                  "src": "1646:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 625,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1646:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1565:98:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 630,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1708:0:4"
            },
            "scope": 667,
            "src": "1548:812:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 668,
        "src": "1008:1354:4"
      }
    ],
    "src": "597:1766:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-06T13:39:42.995Z"
}