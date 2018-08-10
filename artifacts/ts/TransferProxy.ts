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
  "bytecode": "0x608060405260008054600160a060020a03191633179055610aa6806100256000396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063a6c4e4671461016e578063b91816111461019f578063d39de6e9146101d4578063f2fde38b14610239575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a036004351661025a565b005b3480156100d757600080fd5b506100e360043561033d565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a0360043516610365565b34801561012c57600080fd5b506100c96104e9565b34801561014157600080fd5b506100e3610555565b34801561015657600080fd5b506100c9600160a060020a0360043516602435610564565b34801561017a57600080fd5b506100c9600160a060020a0360043581169060243590604435811690606435166106bd565b3480156101ab57600080fd5b506101c0600160a060020a03600435166108f6565b604080519115158252519081900360200190f35b3480156101e057600080fd5b506101e961090b565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022557818101518382015260200161020d565b505050509050019250505060405180910390f35b34801561024557600080fd5b506100c9600160a060020a036004351661096e565b600054600160a060020a0316331461027157600080fd5b600160a060020a03811660009081526001602052604090205460ff161561029757600080fd5b600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061034b57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461037d57600080fd5b600160a060020a03821660009081526001602052604090205460ff1615156103a457600080fd5b50600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156104e55781600160a060020a03166002828154811015156103e957fe5b600091825260209091200154600160a060020a031614156104dd576002805461041990600163ffffffff61099116565b8154811061042357fe5b60009182526020909120015460028054600160a060020a03909216918390811061044957fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560025461048d906001610991565b610498600282610a33565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a26104e5565b6001016103c6565b5050565b600054600160a060020a0316331461050057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461057b57600080fd5b600254811061058957600080fd5b81600160a060020a03166002828154811015156105a257fe5b600091825260209091200154600160a060020a0316146105c157600080fd5b600160a060020a0382166000908152600160208190526040909120805460ff191690556002805490916105fa919063ffffffff61099116565b8154811061060457fe5b60009182526020909120015460028054600160a060020a03909216918390811061062a57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560025461066e906001610991565b610679600282610a33565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b33600090815260016020526040812054819060ff1615156106dd57600080fd5b604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808916600483015285166024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b15801561075857600080fd5b505af415801561076c573d6000803e3d6000fd5b505050506040513d602081101561078257600080fd5b5051604080517f15dacbea000000000000000000000000000000000000000000000000000000008152600160a060020a03808a16600483015280881660248301528616604482015260648101889052905191935073__ERC20Wrapper__________________________916315dacbea91608480820192600092909190829003018186803b15801561081257600080fd5b505af4158015610826573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808b16600483015287166024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b1580156108a557600080fd5b505af41580156108b9573d6000803e3d6000fd5b505050506040513d60208110156108cf57600080fd5b505190506108e3828663ffffffff6109a316565b81146108ee57600080fd5b505050505050565b60016020526000908152604090205460ff1681565b6060600280548060200260200160405190810160405280929190818152602001828054801561096357602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610945575b505050505090505b90565b600054600160a060020a0316331461098557600080fd5b61098e816109b6565b50565b60008282111561099d57fe5b50900390565b818101828110156109b057fe5b92915050565b600160a060020a03811615156109cb57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610a5757600083815260209020610a57918101908301610a5c565b505050565b61096b91905b80821115610a765760008155600101610a62565b50905600a165627a7a723058201db695d711a4a5cc3bfe604e619acc9a50c2f1f30d64ced5edcb011c666127dc0029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063a6c4e4671461016e578063b91816111461019f578063d39de6e9146101d4578063f2fde38b14610239575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a036004351661025a565b005b3480156100d757600080fd5b506100e360043561033d565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a0360043516610365565b34801561012c57600080fd5b506100c96104e9565b34801561014157600080fd5b506100e3610555565b34801561015657600080fd5b506100c9600160a060020a0360043516602435610564565b34801561017a57600080fd5b506100c9600160a060020a0360043581169060243590604435811690606435166106bd565b3480156101ab57600080fd5b506101c0600160a060020a03600435166108f6565b604080519115158252519081900360200190f35b3480156101e057600080fd5b506101e961090b565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022557818101518382015260200161020d565b505050509050019250505060405180910390f35b34801561024557600080fd5b506100c9600160a060020a036004351661096e565b600054600160a060020a0316331461027157600080fd5b600160a060020a03811660009081526001602052604090205460ff161561029757600080fd5b600160a060020a0381166000818152600160208181526040808420805460ff1916841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace909101805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600280548290811061034b57fe5b600091825260209091200154600160a060020a0316905081565b60008054600160a060020a0316331461037d57600080fd5b600160a060020a03821660009081526001602052604090205460ff1615156103a457600080fd5b50600160a060020a0381166000908152600160205260408120805460ff191690555b6002548110156104e55781600160a060020a03166002828154811015156103e957fe5b600091825260209091200154600160a060020a031614156104dd576002805461041990600163ffffffff61099116565b8154811061042357fe5b60009182526020909120015460028054600160a060020a03909216918390811061044957fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560025461048d906001610991565b610498600282610a33565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a26104e5565b6001016103c6565b5050565b600054600160a060020a0316331461050057600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461057b57600080fd5b600254811061058957600080fd5b81600160a060020a03166002828154811015156105a257fe5b600091825260209091200154600160a060020a0316146105c157600080fd5b600160a060020a0382166000908152600160208190526040909120805460ff191690556002805490916105fa919063ffffffff61099116565b8154811061060457fe5b60009182526020909120015460028054600160a060020a03909216918390811061062a57fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560025461066e906001610991565b610679600282610a33565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b33600090815260016020526040812054819060ff1615156106dd57600080fd5b604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808916600483015285166024820152905173__ERC20Wrapper__________________________9163f7888aec916044808301926020929190829003018186803b15801561075857600080fd5b505af415801561076c573d6000803e3d6000fd5b505050506040513d602081101561078257600080fd5b5051604080517f15dacbea000000000000000000000000000000000000000000000000000000008152600160a060020a03808a16600483015280881660248301528616604482015260648101889052905191935073__ERC20Wrapper__________________________916315dacbea91608480820192600092909190829003018186803b15801561081257600080fd5b505af4158015610826573d6000803e3d6000fd5b5050604080517ff7888aec000000000000000000000000000000000000000000000000000000008152600160a060020a03808b16600483015287166024820152905173__ERC20Wrapper__________________________935063f7888aec92506044808301926020929190829003018186803b1580156108a557600080fd5b505af41580156108b9573d6000803e3d6000fd5b505050506040513d60208110156108cf57600080fd5b505190506108e3828663ffffffff6109a316565b81146108ee57600080fd5b505050505050565b60016020526000908152604090205460ff1681565b6060600280548060200260200160405190810160405280929190818152602001828054801561096357602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610945575b505050505090505b90565b600054600160a060020a0316331461098557600080fd5b61098e816109b6565b50565b60008282111561099d57fe5b50900390565b818101828110156109b057fe5b92915050565b600160a060020a03811615156109cb57600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b815481835581811115610a5757600083815260209020610a57918101908301610a5c565b505050565b61096b91905b80821115610a765760008155600101610a62565b50905600a165627a7a723058201db695d711a4a5cc3bfe604e619acc9a50c2f1f30d64ced5edcb011c666127dc0029",
  "sourceMap": "1008:1363:4:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;1008:1363:4;;;;;;",
  "deployedSourceMap": "1008:1363:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2137:497:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2137:497:45;-1:-1:-1;;;;;2137:497:45;;;;;;;1316:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1316:28:45;;;;;;;;;-1:-1:-1;;;;;1316:28:45;;;;;;;;;;;;;;2801:990;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2801:990:45;-1:-1:-1;;;;;2801:990:45;;;;;1001:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:61;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;4058:852:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4058:852:45;-1:-1:-1;;;;;4058:852:45;;;;;;;1548:821:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1548:821:4;-1:-1:-1;;;;;1548:821:4;;;;;;;;;;;;;;;;;;1229:43:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1229:43:45;-1:-1:-1;;;;;1229:43:45;;;;;;;;;;;;;;;;;;;;;;;5083:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5083:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5083:186:45;;;;;;;;;;;;;;;;;1274:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:61;-1:-1:-1;;;;;1274:103:61;;;;;2137:497:45;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2304:23:45;;;;;;:10;:23;;;;;;;;2303:24;2295:33;;;;;;-1:-1:-1;;;;;2380:23:45;;;;;;2406:4;2380:23;;;;;;;;:30;;-1:-1:-1;;2380:30:45;;;;;2465:11;27:10:-1;;23:18;;;45:23;;2465:29:45;;;;;;;;;-1:-1:-1;;2465:29:45;;;;;2551:76;;2607:10;2551:76;;;;;;;;;;;;;;2137:497;:::o;1316:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1316:28:45;;-1:-1:-1;1316:28:45;:::o;2801:990::-;3122:9;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2953:23:45;;;;;;:10;:23;;;;;;;;2945:32;;;;;;;;-1:-1:-1;;;;;;3083:23:45;;;;;;:10;:23;;;;;3076:30;;-1:-1:-1;;3076:30:45;;;3117:668;3141:11;:18;3137:22;;3117:668;;;3273:11;-1:-1:-1;;;;;3255:29:45;:11;3267:1;3255:14;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3255:14:45;:29;3251:524;;;3399:11;3411:18;;:25;;3434:1;3411:25;:22;:25;:::i;:::-;3399:38;;;;;;;;;;;;;;;;;;3382:11;:14;;-1:-1:-1;;;;;3399:38:45;;;;3394:1;;3382:14;;;;;;;;;;;;;;;:55;;-1:-1:-1;;3382:55:45;-1:-1:-1;;;;;3382:55:45;;;;;;;;;;3525:11;:18;:25;;-1:-1:-1;3525:22:45;:25::i;:::-;3504:46;:11;:46;;:::i;:::-;-1:-1:-1;3630:107:45;;;3709:10;3630:107;;;;-1:-1:-1;;;;;3630:107:45;;;;;;;;;;;;;3755:5;;3251:524;3161:3;;3117:668;;;2801:990;;:::o;1001:111:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:61;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:61;;;1001:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:61;;:::o;4058:852:45:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;4283:11:45;:18;4274:27;;4266:36;;;;;;4418:11;-1:-1:-1;;;;;4395:34:45;:11;4407:6;4395:19;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4395:19:45;:34;4387:43;;;;;;-1:-1:-1;;;;;4498:23:45;;;;;;:10;:23;;;;;;;;4491:30;;-1:-1:-1;;4491:30:45;;;4619:11;4631:18;;4619:11;;4631:25;;:18;:25;:22;:25;:::i;:::-;4619:38;;;;;;;;;;;;;;;;;;4597:11;:19;;-1:-1:-1;;;;;4619:38:45;;;;4609:6;;4597:19;;;;;;;;;;;;;;;:60;;-1:-1:-1;;4597:60:45;-1:-1:-1;;;;;4597:60:45;;;;;;;;;;4731:11;:18;:25;;-1:-1:-1;4731:22:45;:25::i;:::-;4710:46;:11;:46;;:::i;:::-;-1:-1:-1;4820:83:45;;;4883:10;4820:83;;;;-1:-1:-1;;;;;4820:83:45;;;;;;;;;;;;;4058:852;;:::o;1548:821:4:-;1525:10:45;1783:23:4;1514:22:45;;;:10;:22;;;;;;1783:23:4;;1514:22:45;;1506:31;;;;;;;;1809:69:4;;;;;;-1:-1:-1;;;;;1809:69:4;;;;;;;;;;;;;;;:12;;:22;;:69;;;;;;;;;;;;;;:12;:69;;;5:2:-1;;;;30:1;27;20:12;5:2;1809:69:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1809:69:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1809:69:4;1962:114;;;;;;-1:-1:-1;;;;;1962:114:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:69;;-1:-1:-1;1962:12:4;;:25;;:114;;;;;-1:-1:-1;;1962:114:4;;;;;;;;:12;:114;;;5:2:-1;;;;30:1;27;20:12;5:2;1962:114:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;2169:69:4;;;;;;-1:-1:-1;;;;;2169:69:4;;;;;;;;;;;;;;;:12;;-1:-1:-1;2169:22:4;;-1:-1:-1;2169:69:4;;;;;;;;;;;;;;:12;:69;;;5:2:-1;;;;30:1;27;20:12;5:2;2169:69:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2169:69:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2169:69:4;;-1:-1:-1;2331:30:4;:15;2351:9;2331:30;:19;:30;:::i;:::-;2317:44;;2309:53;;;;;;1548:821;;;;;;:::o;1229:43:45:-;;;;;;;;;;;;;;;:::o;5083:186::-;5164:9;5251:11;5244:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5244:18:45;;;;;;;;;;;;;;;;;;;;;;;5083:186;;:::o;1274:103:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;1042:110:60:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:60;;;1042:110::o;1214:123::-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o;1512:171:61:-;-1:-1:-1;;;;;1582:23:61;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:61;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:61;-1:-1:-1;;;;;1661:17:61;;;;;;;;;;1512:171::o;1008:1363:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { Authorizable } from \"../lib/Authorizable.sol\";\nimport { ERC20Wrapper } from \"../lib/ERC20Wrapper.sol\";\n\n\n/**\n * @title TransferProxy\n * @author Set Protocol\n *\n * The transferProxy contract is responsible for moving tokens through the system to\n * assist with issuance and filling issuance orders.\n */\n\ncontract TransferProxy is\n    Authorizable\n{\n    using SafeMath for uint256;\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _token          The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     */\n    function transfer(\n        address _token,\n        uint256 _quantity,\n        address _from,\n        address _to\n    )\n        external\n        onlyAuthorized\n    {\n        // Retrieve current balance of token for the receiver\n        uint256 existingBalance = ERC20Wrapper.balanceOf(\n            _token,\n            _to\n        );\n\n        // Call specified ERC20 contract to transfer tokens (via proxy).\n        ERC20Wrapper.transferFrom(\n            _token,\n            _from,\n            _to,\n            _quantity\n        );\n\n        // Get new balance of transferred token for receiver\n        uint256 newBalance = ERC20Wrapper.balanceOf(\n            _token,\n            _to\n        );\n\n        // Verify transfer quantity is reflected in balance\n        require(newBalance == existingBalance.add(_quantity));\n    }\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/TransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        668
      ]
    },
    "id": 669,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 608,
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
        "id": 610,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 6746,
        "src": "622:73:4",
        "symbolAliases": [
          {
            "foreign": 609,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 612,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 5064,
        "src": "696:55:4",
        "symbolAliases": [
          {
            "foreign": 611,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 614,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 5243,
        "src": "752:55:4",
        "symbolAliases": [
          {
            "foreign": 613,
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
              "id": 615,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5063,
              "src": "1038:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$5063",
                "typeString": "contract Authorizable"
              }
            },
            "id": 616,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:12:4"
          }
        ],
        "contractDependencies": [
          5063,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The transferProxy contract is responsible for moving tokens through the system to\nassist with issuance and filling issuance orders.",
        "fullyImplemented": true,
        "id": 668,
        "linearizedBaseContracts": [
          668,
          5063,
          6831
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 619,
            "libraryName": {
              "contractScope": null,
              "id": 617,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "1063:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1057:27:4",
            "typeName": {
              "id": 618,
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
              "id": 666,
              "nodeType": "Block",
              "src": "1711:658:4",
              "statements": [
                {
                  "assignments": [
                    633
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 633,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 667,
                      "src": "1783:23:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 632,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "1783:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 639,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 636,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "1845:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 637,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "1865:3:4",
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
                        "id": 634,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "1809:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 635,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "1809:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 638,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1809:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1783:95:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "2001:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 644,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 625,
                        "src": "2021:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 645,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "2040:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 646,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 623,
                        "src": "2057:9:4",
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
                        "id": 640,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "1962:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 642,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5170,
                      "src": "1962:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 647,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1962:114:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 648,
                  "nodeType": "ExpressionStatement",
                  "src": "1962:114:4"
                },
                {
                  "assignments": [
                    650
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 650,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 667,
                      "src": "2148:18:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 649,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2148:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 656,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 653,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "2205:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 654,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "2225:3:4",
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
                        "id": 651,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2169:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 652,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2169:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2169:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2148:90:4"
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
                        "id": 663,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 658,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 650,
                          "src": "2317:10:4",
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
                              "id": 661,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 623,
                              "src": "2351:9:4",
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
                              "id": 659,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 633,
                              "src": "2331:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 660,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "2331:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 662,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2331:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2317:44:4",
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
                      "id": 657,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2309:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 664,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2309:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 665,
                  "nodeType": "ExpressionStatement",
                  "src": "2309:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 667,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 630,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 629,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "1692:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1692:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 628,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 621,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1575:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 620,
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
                  "id": 623,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1599:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 622,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1599:7:4",
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
                  "id": 625,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1626:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 624,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:7:4",
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
                  "id": 627,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1649:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 626,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1649:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1565:101:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 631,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1711:0:4"
            },
            "scope": 668,
            "src": "1548:821:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 669,
        "src": "1008:1363:4"
      }
    ],
    "src": "597:1775:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        668
      ]
    },
    "id": 669,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 608,
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
        "id": 610,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 6746,
        "src": "622:73:4",
        "symbolAliases": [
          {
            "foreign": 609,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 612,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 5064,
        "src": "696:55:4",
        "symbolAliases": [
          {
            "foreign": 611,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 614,
        "nodeType": "ImportDirective",
        "scope": 669,
        "sourceUnit": 5243,
        "src": "752:55:4",
        "symbolAliases": [
          {
            "foreign": 613,
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
              "id": 615,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5063,
              "src": "1038:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$5063",
                "typeString": "contract Authorizable"
              }
            },
            "id": 616,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:12:4"
          }
        ],
        "contractDependencies": [
          5063,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The transferProxy contract is responsible for moving tokens through the system to\nassist with issuance and filling issuance orders.",
        "fullyImplemented": true,
        "id": 668,
        "linearizedBaseContracts": [
          668,
          5063,
          6831
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 619,
            "libraryName": {
              "contractScope": null,
              "id": 617,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6745,
              "src": "1063:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6745",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1057:27:4",
            "typeName": {
              "id": 618,
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
              "id": 666,
              "nodeType": "Block",
              "src": "1711:658:4",
              "statements": [
                {
                  "assignments": [
                    633
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 633,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 667,
                      "src": "1783:23:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 632,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "1783:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 639,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 636,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "1845:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 637,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "1865:3:4",
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
                        "id": 634,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "1809:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 635,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "1809:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 638,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1809:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1783:95:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 643,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "2001:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 644,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 625,
                        "src": "2021:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 645,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "2040:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 646,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 623,
                        "src": "2057:9:4",
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
                        "id": 640,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "1962:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 642,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5170,
                      "src": "1962:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 647,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1962:114:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 648,
                  "nodeType": "ExpressionStatement",
                  "src": "1962:114:4"
                },
                {
                  "assignments": [
                    650
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 650,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 667,
                      "src": "2148:18:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 649,
                        "name": "uint256",
                        "nodeType": "ElementaryTypeName",
                        "src": "2148:7:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 656,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 653,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 621,
                        "src": "2205:6:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 654,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 627,
                        "src": "2225:3:4",
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
                        "id": 651,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5242,
                        "src": "2169:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$5242_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 652,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 5101,
                      "src": "2169:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_delegatecall_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 655,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2169:69:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2148:90:4"
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
                        "id": 663,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 658,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 650,
                          "src": "2317:10:4",
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
                              "id": 661,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 623,
                              "src": "2351:9:4",
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
                              "id": 659,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 633,
                              "src": "2331:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 660,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6744,
                            "src": "2331:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 662,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2331:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2317:44:4",
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
                      "id": 657,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2309:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 664,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2309:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 665,
                  "nodeType": "ExpressionStatement",
                  "src": "2309:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _token          The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 667,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 630,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 629,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4882,
                  "src": "1692:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1692:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 628,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 621,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1575:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 620,
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
                  "id": 623,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1599:17:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 622,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1599:7:4",
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
                  "id": 625,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1626:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 624,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1626:7:4",
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
                  "id": 627,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 667,
                  "src": "1649:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 626,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1649:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1565:101:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 631,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1711:0:4"
            },
            "scope": 668,
            "src": "1548:821:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 669,
        "src": "1008:1363:4"
      }
    ],
    "src": "597:1775:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.330Z"
}