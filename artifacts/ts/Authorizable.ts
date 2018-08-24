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
      "constant": true,
      "inputs": [],
      "name": "gracePeriodEnd",
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
      "inputs": [
        {
          "name": "_gracePeriod",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
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
  "bytecode": "0x608060405234801561001057600080fd5b50604051602080610aef833981016040525160008054600160a060020a0319163317905561004b4282640100000000610a3a61005482021704565b60015550610067565b8181018281101561006157fe5b92915050565b610a79806100766000396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063b91816111461016e578063d39de6e9146101a3578063dae2a76c14610208578063f2fde38b1461022f575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610250565b005b3480156100d757600080fd5b506100e3600435610345565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a036004351661036d565b34801561012c57600080fd5b506100c961049d565b34801561014157600080fd5b506100e3610509565b34801561015657600080fd5b506100c9600160a060020a0360043516602435610518565b34801561017a57600080fd5b5061018f600160a060020a036004351661067b565b604080519115158252519081900360200190f35b3480156101af57600080fd5b506101b8610690565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d6106f3565b60408051918252519081900360200190f35b34801561023b57600080fd5b506100c9600160a060020a03600435166106f9565b600054600160a060020a0316331461026757600080fd5b600154421061027557600080fd5b600160a060020a03811660009081526002602052604090205460ff161561029b57600080fd5b600160a060020a0381166000818152600260209081526040808320805460ff191660019081179091556003805491820181559093527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b909201805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600380548290811061035357fe5b600091825260209091200154600160a060020a0316905081565b600054600160a060020a0316331461038457600080fd5b600154421061039257600080fd5b600160a060020a03811660009081526002602052604090205460ff1615156103b957600080fd5b600160a060020a038116600090815260026020908152604091829020805460ff19169055600380548351818402810184019094528084526104469385939092919083018282801561043357602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610415575b505050505061071c90919063ffffffff16565b805161045a91600391602090910190610954565b50604080513381529051600160a060020a038316917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a250565b600054600160a060020a031633146104b457600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461052f57600080fd5b600154421061053d57600080fd5b600354811061054b57600080fd5b81600160a060020a031660038281548110151561056457fe5b600091825260209091200154600160a060020a03161461058357600080fd5b600160a060020a0382166000908152600260205260409020805460ff19169055600380546105b890600163ffffffff61075216565b815481106105c257fe5b60009182526020909120015460038054600160a060020a0390921691839081106105e857fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560035461062c906001610752565b6106376003826109c6565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60026020526000908152604090205460ff1681565b606060038054806020026020016040519081016040528092919081815260200182805480156106e857602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116106ca575b505050505090505b90565b60015481565b600054600160a060020a0316331461071057600080fd5b61071981610764565b50565b6060600080606061072d86866107e1565b9250925081151561073d57600080fd5b6107478684610848565b509695505050505050565b60008282111561075e57fe5b50900390565b600160a060020a038116151561077957600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108375784600160a060020a0316868281518110151561080a57fe5b90602001906020020151600160a060020a0316141561082f578060019350935061083f565b6001016107ea565b600093508392505b50509250929050565b6060600080606060008651925060018303604051908082528060200260200182016040528015610882578160200160208202803883390190505b509150600090505b858110156108d75786818151811015156108a057fe5b9060200190602002015182828151811015156108b857fe5b600160a060020a0390921660209283029091019091015260010161088a565b50600185015b8281101561092d5786818151811015156108f357fe5b90602001906020020151826001830381518110151561090e57fe5b600160a060020a039092166020928302909101909101526001016108dd565b81878781518110151561093c57fe5b90602001906020020151945094505050509250929050565b8280548282559060005260206000209081019282156109b6579160200282015b828111156109b6578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03909116178255602090920191600190910190610974565b506109c29291506109ef565b5090565b8154818355818111156109ea576000838152602090206109ea918101908301610a20565b505050565b6106f091905b808211156109c257805473ffffffffffffffffffffffffffffffffffffffff191681556001016109f5565b6106f091905b808211156109c25760008155600101610a26565b81810182811015610a4757fe5b929150505600a165627a7a72305820b6699bd46a5e374a55fe00d517f746f57ed657a36465dfde541ee7247bc8c2510029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100cb57806370712939146100ff578063715018a6146101205780638da5cb5b146101355780639ad267441461014a578063b91816111461016e578063d39de6e9146101a3578063dae2a76c14610208578063f2fde38b1461022f575b600080fd5b3480156100b457600080fd5b506100c9600160a060020a0360043516610250565b005b3480156100d757600080fd5b506100e3600435610345565b60408051600160a060020a039092168252519081900360200190f35b34801561010b57600080fd5b506100c9600160a060020a036004351661036d565b34801561012c57600080fd5b506100c961049d565b34801561014157600080fd5b506100e3610509565b34801561015657600080fd5b506100c9600160a060020a0360043516602435610518565b34801561017a57600080fd5b5061018f600160a060020a036004351661067b565b604080519115158252519081900360200190f35b3480156101af57600080fd5b506101b8610690565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d6106f3565b60408051918252519081900360200190f35b34801561023b57600080fd5b506100c9600160a060020a03600435166106f9565b600054600160a060020a0316331461026757600080fd5b600154421061027557600080fd5b600160a060020a03811660009081526002602052604090205460ff161561029b57600080fd5b600160a060020a0381166000818152600260209081526040808320805460ff191660019081179091556003805491820181559093527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b909201805473ffffffffffffffffffffffffffffffffffffffff191684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b600380548290811061035357fe5b600091825260209091200154600160a060020a0316905081565b600054600160a060020a0316331461038457600080fd5b600154421061039257600080fd5b600160a060020a03811660009081526002602052604090205460ff1615156103b957600080fd5b600160a060020a038116600090815260026020908152604091829020805460ff19169055600380548351818402810184019094528084526104469385939092919083018282801561043357602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610415575b505050505061071c90919063ffffffff16565b805161045a91600391602090910190610954565b50604080513381529051600160a060020a038316917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a250565b600054600160a060020a031633146104b457600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a031681565b600054600160a060020a0316331461052f57600080fd5b600154421061053d57600080fd5b600354811061054b57600080fd5b81600160a060020a031660038281548110151561056457fe5b600091825260209091200154600160a060020a03161461058357600080fd5b600160a060020a0382166000908152600260205260409020805460ff19169055600380546105b890600163ffffffff61075216565b815481106105c257fe5b60009182526020909120015460038054600160a060020a0390921691839081106105e857fe5b6000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039290921691909117905560035461062c906001610752565b6106376003826109c6565b50604080513381529051600160a060020a038416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b60026020526000908152604090205460ff1681565b606060038054806020026020016040519081016040528092919081815260200182805480156106e857602002820191906000526020600020905b8154600160a060020a031681526001909101906020018083116106ca575b505050505090505b90565b60015481565b600054600160a060020a0316331461071057600080fd5b61071981610764565b50565b6060600080606061072d86866107e1565b9250925081151561073d57600080fd5b6107478684610848565b509695505050505050565b60008282111561075e57fe5b50900390565b600160a060020a038116151561077957600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108375784600160a060020a0316868281518110151561080a57fe5b90602001906020020151600160a060020a0316141561082f578060019350935061083f565b6001016107ea565b600093508392505b50509250929050565b6060600080606060008651925060018303604051908082528060200260200182016040528015610882578160200160208202803883390190505b509150600090505b858110156108d75786818151811015156108a057fe5b9060200190602002015182828151811015156108b857fe5b600160a060020a0390921660209283029091019091015260010161088a565b50600185015b8281101561092d5786818151811015156108f357fe5b90602001906020020151826001830381518110151561090e57fe5b600160a060020a039092166020928302909101909101526001016108dd565b81878781518110151561093c57fe5b90602001906020020151945094505050509250929050565b8280548282559060005260206000209081019282156109b6579160200282015b828111156109b6578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03909116178255602090920191600190910190610974565b506109c29291506109ef565b5090565b8154818355818111156109ea576000838152602090206109ea918101908301610a20565b505050565b6106f091905b808211156109c257805473ffffffffffffffffffffffffffffffffffffffff191681556001016109f5565b6106f091905b808211156109c25760008155600101610a26565b81810182811015610a4757fe5b929150505600a165627a7a72305820b6699bd46a5e374a55fe00d517f746f57ed657a36465dfde541ee7247bc8c2510029",
  "sourceMap": "1118:4545:34:-;;;2313:140;8:9:-1;5:2;;;30:1;27;20:12;5:2;2313:140:34;;;;;;;;;;;;;567:5:43;:18;;-1:-1:-1;;;;;;567:18:43;575:10;567:18;;;2413:33:34;:15;2313:140;2413:19;;;;;;:33;:::i;:::-;2396:14;:50;-1:-1:-1;1118:4545:34;;1214:123:42;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o;1118:4545:34:-;;;;;;;",
  "deployedSourceMap": "1118:4545:34:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2669:606;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2669:606:34;-1:-1:-1;;;;;2669:606:34;;;;;;;1543:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1543:28:34;;;;;;;;;-1:-1:-1;;;;;1543:28:34;;;;;;;;;;;;;;3442:624;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3442:624:34;-1:-1:-1;;;;;3442:624:34;;;;;1001:111:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:43;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:43;;;;4333:969:34;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4333:969:34;-1:-1:-1;;;;;4333:969:34;;;;;;;1456:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1456:43:34;-1:-1:-1;;;;;1456:43:34;;;;;;;;;;;;;;;;;;;;;;;5475:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5475:186:34;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5475:186:34;;;;;;;;;;;;;;;;;1357:29;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1357:29:34;;;;;;;;;;;;;;;;;;;;1274:103:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:43;-1:-1:-1;;;;;1274:103:43;;;;;2669:606:34;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;2852:14:34;;2834:15;:32;2826:41;;;;;;-1:-1:-1;;;;;2945:23:34;;;;;;:10;:23;;;;;;;;2944:24;2936:33;;;;;;-1:-1:-1;;;;;3021:23:34;;;;;;:10;:23;;;;;;;;:30;;-1:-1:-1;;3021:30:34;3047:4;3021:30;;;;;;3106:11;27:10:-1;;23:18;;;45:23;;3106:29:34;;;;;;;;;-1:-1:-1;;3106:29:34;;;;;3192:76;;3248:10;3192:76;;;;;;;;;;;;;;2669:606;:::o;1543:28::-;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1543:28:34;;-1:-1:-1;1543:28:34;:::o;3442:624::-;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;3628:14:34;;3610:15;:32;3602:41;;;;;;-1:-1:-1;;;;;3703:23:34;;;;;;:10;:23;;;;;;;;3695:32;;;;;;;;-1:-1:-1;;;;;3833:23:34;;;;;;:10;:23;;;;;;;;;3826:30;;-1:-1:-1;;3826:30:34;;;3881:11;:18;;;;;;;;;;;;;;;;;:31;;3844:11;;3881:18;;:11;:18;;;:11;:18;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3881:18:34;;;;;;;;;;;;;;;;;;;;;;;:31;;;;:::i;:::-;3867:45;;;;:11;;:45;;;;;;:::i;:::-;-1:-1:-1;3976:83:34;;;4039:10;3976:83;;;;-1:-1:-1;;;;;3976:83:34;;;;;;;;;;;;;3442:624;:::o;1001:111:43:-;719:5;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:43;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:43;;;1001:111::o;238:20::-;;;-1:-1:-1;;;;;238:20:43;;:::o;4333:969:34:-;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;4564:14:34;;4546:15;:32;4538:41;;;;;;4675:11;:18;4666:27;;4658:36;;;;;;4810:11;-1:-1:-1;;;;;4787:34:34;:11;4799:6;4787:19;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;4787:19:34;:34;4779:43;;;;;;-1:-1:-1;;;;;4890:23:34;;;;;;:10;:23;;;;;4883:30;;-1:-1:-1;;4883:30:34;;;5011:11;5023:18;;:25;;4883:30;5023:25;:22;:25;:::i;:::-;5011:38;;;;;;;;;;;;;;;;;;4989:11;:19;;-1:-1:-1;;;;;5011:38:34;;;;5001:6;;4989:19;;;;;;;;;;;;;;;:60;;-1:-1:-1;;4989:60:34;-1:-1:-1;;;;;4989:60:34;;;;;;;;;;5123:11;:18;:25;;-1:-1:-1;5123:22:34;:25::i;:::-;5102:46;:11;:46;;:::i;:::-;-1:-1:-1;5212:83:34;;;5275:10;5212:83;;;;-1:-1:-1;;;;;5212:83:34;;;;;;;;;;;;;4333:969;;:::o;1456:43::-;;;;;;;;;;;;;;;:::o;5475:186::-;5556:9;5643:11;5636:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;5636:18:34;;;;;;;;;;;;;;;;;;;;;;;5475:186;;:::o;1357:29::-;;;;:::o;1274:103:43:-;719:5;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;6618:270:33:-;6700:9;6727:13;6742:9;6823:19;6755:13;6763:1;6766;6755:7;:13::i;:::-;6726:42;;;;6779:4;6778:5;6774:110;;;6793:8;;;6774:110;6847:13;6851:1;6854:5;6847:3;:13::i;:::-;-1:-1:-1;6822:38:33;6618:270;-1:-1:-1;;;;;;6618:270:33:o;1042:110:42:-;1100:7;1122:6;;;;1115:14;;;;-1:-1:-1;1142:5:42;;;1042:110::o;1512:171:43:-;-1:-1:-1;;;;;1582:23:43;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:43;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:43;-1:-1:-1;;;;;1661:17:43;;;;;;;;;;1512:171::o;293:251:33:-;402:8;;364:7;;;;;416:101;440:6;436:1;:10;416:101;;;473:1;-1:-1:-1;;;;;465:9:33;:1;467;465:4;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;465:9:33;;461:50;;;494:1;497:4;486:16;;;;;;461:50;448:3;;416:101;;;530:1;;-1:-1:-1;530:1:33;;-1:-1:-1;293:251:33;;;;;;;;:::o;6158:409::-;6241:9;6259:7;6276:14;6307:29;6375:9;6293:1;:8;6276:25;;6362:1;6353:6;:10;6339:25;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;6339:25:33;;6307:57;;6387:1;6375:13;;6370:73;6394:5;6390:1;:9;6370:73;;;6432:1;6434;6432:4;;;;;;;;;;;;;;;;;;6414:12;6427:1;6414:15;;;;;;;;;;-1:-1:-1;;;;;6414:22:33;;;:15;;;;;;;;;;:22;6401:3;;6370:73;;;-1:-1:-1;6465:1:33;6457:9;;6448:78;6472:6;6468:1;:10;6448:78;;;6515:1;6517;6515:4;;;;;;;;;;;;;;;;;;6493:12;6510:1;6506;:5;6493:19;;;;;;;;;;-1:-1:-1;;;;;6493:26:33;;;:19;;;;;;;;;;:26;6480:3;;6448:78;;;6539:12;6553:1;6555:5;6553:8;;;;;;;;;;;;;;;;;;6531:31;;;;6158:409;;;;;;;;:::o;1118:4545:34:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1118:4545:34;-1:-1:-1;;;;;1118:4545:34;;;;;;;;;;;-1:-1:-1;1118:4545:34;;;;;;;-1:-1:-1;1118:4545:34;;;-1:-1:-1;1118:4545:34;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;1118:4545:34;;;;;;;;;;;;;;;;;;;;;;;;;1214:123:42;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { AddressArrayUtils } from \"../external/cryptofin/AddressArrayUtils.sol\";\n\n\n/**\n * @title Authorizable\n * @author Set Protocol\n *\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\n * through the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.\n */\ncontract Authorizable is\n    Ownable\n{\n    using SafeMath for uint256;\n    using AddressArrayUtils for address[];\n\n    /* ============ State Variables ============ */\n\n    // Time in which authorized addresses can no longer be changed\n    uint256 public gracePeriodEnd;\n\n    // Mapping of addresses to bool indicator of authorization\n    mapping (address => bool) public authorized;\n\n    // Array of authorized addresses\n    address[] public authorities;\n\n    /* ============ Modifiers ============ */\n\n    // Only authorized addresses can invoke functions with this modifier.\n    modifier onlyAuthorized {\n        require(authorized[msg.sender]);\n        _;\n    }\n\n    /* ============ Events ============ */\n\n    // Event emitted when new address is authorized.\n    event AddressAuthorized (\n        address indexed authAddress,\n        address authorizedBy\n    );\n\n    // Event emitted when address is deauthorized.\n    event AuthorizedAddressRemoved (\n        address indexed addressRemoved,\n        address authorizedBy\n    );\n\n    /* ============ Constructor ============ */\n    \n    /**\n     * @param  _gracePeriod   Time period in which authorizations can be added or removed\n     */\n    constructor\n    (\n        uint256 _gracePeriod\n    )\n        public \n    {\n        gracePeriodEnd = block.timestamp.add(_gracePeriod);\n    }\n\n    /* ============ Setters ============ */\n\n    /**\n     * Add authorized address to contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address of the new authorized contract\n     */\n\n    function addAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require that timestamp is before grace period\n        require(block.timestamp < gracePeriodEnd);\n\n        // Require that address is not already authorized\n        require(!authorized[_authTarget]);\n\n        // Set address authority to true\n        authorized[_authTarget] = true;\n\n        // Add address to authorities array\n        authorities.push(_authTarget);\n\n        // Emit authorized address event\n        emit AddressAuthorized(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /**\n     * Remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     */\n\n    function removeAuthorizedAddress(address _authTarget)\n        external\n        onlyOwner\n    {\n        // Require that timestamp is before grace period\n        require(block.timestamp < gracePeriodEnd);\n\n        // Require address is authorized\n        require(authorized[_authTarget]); // Target address must be authorized.\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        authorities = authorities.remove(_authTarget);\n\n        // Emit AuthorizedAddressRemoved event.\n        emit AuthorizedAddressRemoved(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /**\n     * More efficiently remove authorized address from contract. Can only be set by owner.\n     *\n     * @param  _authTarget   The address to be de-permissioned\n     * @param _index           The index of the _authTarget address in authorities\n     */\n\n    function removeAuthorizedAddressAtIndex(\n        address _authTarget,\n        uint256 _index\n    )\n        external\n        onlyOwner\n    {\n        // Require that timestamp is before grace period\n        require(block.timestamp < gracePeriodEnd);\n        \n        // Require index is less than length of authorities\n        require(_index < authorities.length);\n\n        // Require address at index of authorities matches target address\n        require(authorities[_index] == _authTarget);\n\n        // Delete address from authorized mapping\n        delete authorized[_authTarget];\n\n        // Replace address at index with address at end of array\n        authorities[_index] = authorities[authorities.length.sub(1)];\n\n        // Remove last address from array\n        authorities.length = authorities.length.sub(1);\n\n        // Emit AuthorizedAddressRemoved event.\n        emit AuthorizedAddressRemoved(\n            _authTarget,\n            msg.sender\n        );\n    }\n\n    /* ============ Getters ============ */\n\n    /**\n     * Get array of authorized addresses.\n     *\n     * @return address[]   Array of authorized addresses\n     */\n    function getAuthorizedAddresses()\n        external\n        view\n        returns (address[] memory)\n    {\n        // Return array of authorized addresses\n        return authorities;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        5898
      ]
    },
    "id": 5899,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5683,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:34"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 5685,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 6550,
        "src": "622:76:34",
        "symbolAliases": [
          {
            "foreign": 5684,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 5687,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 6464,
        "src": "699:73:34",
        "symbolAliases": [
          {
            "foreign": 5686,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../external/cryptofin/AddressArrayUtils.sol",
        "id": 5689,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 5682,
        "src": "773:80:34",
        "symbolAliases": [
          {
            "foreign": 5688,
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
              "id": 5690,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6549,
              "src": "1147:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6549",
                "typeString": "contract Ownable"
              }
            },
            "id": 5691,
            "nodeType": "InheritanceSpecifier",
            "src": "1147:7:34"
          }
        ],
        "contractDependencies": [
          6549
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 5898,
        "linearizedBaseContracts": [
          5898,
          6549
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 5694,
            "libraryName": {
              "contractScope": null,
              "id": 5692,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "1167:8:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1161:27:34",
            "typeName": {
              "id": 5693,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1180:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 5698,
            "libraryName": {
              "contractScope": null,
              "id": 5695,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5681,
              "src": "1199:17:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$5681",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1193:38:34",
            "typeName": {
              "baseType": {
                "id": 5696,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1221:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 5697,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1221:9:34",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "constant": false,
            "id": 5700,
            "name": "gracePeriodEnd",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1357:29:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 5699,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1357:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5704,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1456:43:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 5703,
              "keyType": {
                "id": 5701,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1465:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1456:25:34",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 5702,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1476:4:34",
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
            "id": 5707,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1543:28:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 5705,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1543:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 5706,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1543:9:34",
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
              "id": 5717,
              "nodeType": "Block",
              "src": "1723:59:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 5710,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5704,
                          "src": "1741:10:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 5713,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5711,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7016,
                            "src": "1752:3:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 5712,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1752:10:34",
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
                        "src": "1741:22:34",
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
                      "id": 5709,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "1733:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5714,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1733:31:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5715,
                  "nodeType": "ExpressionStatement",
                  "src": "1733:31:34"
                },
                {
                  "id": 5716,
                  "nodeType": "PlaceholderStatement",
                  "src": "1774:1:34"
                }
              ]
            },
            "documentation": null,
            "id": 5718,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5708,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1723:0:34"
            },
            "src": "1699:83:34",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5724,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5723,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5720,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5724,
                  "src": "1919:27:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5719,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1919:7:34",
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
                  "id": 5722,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 5724,
                  "src": "1956:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5721,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1956:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1909:73:34"
            },
            "src": "1885:98:34"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5730,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5729,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5726,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 5730,
                  "src": "2081:30:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5725,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:34",
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
                  "id": 5728,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 5730,
                  "src": "2121:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5727,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2071:76:34"
            },
            "src": "2040:108:34"
          },
          {
            "body": {
              "id": 5743,
              "nodeType": "Block",
              "src": "2386:67:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5741,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5735,
                      "name": "gracePeriodEnd",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5700,
                      "src": "2396:14:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 5739,
                          "name": "_gracePeriod",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5732,
                          "src": "2433:12:34",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 5736,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "2413:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5737,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2413:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5738,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6462,
                        "src": "2413:19:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5740,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2413:33:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2396:50:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5742,
                  "nodeType": "ExpressionStatement",
                  "src": "2396:50:34"
                }
              ]
            },
            "documentation": "@param  _gracePeriod   Time period in which authorizations can be added or removed",
            "id": 5744,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5732,
                  "name": "_gracePeriod",
                  "nodeType": "VariableDeclaration",
                  "scope": 5744,
                  "src": "2339:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2339:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2329:36:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5734,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2386:0:34"
            },
            "scope": 5898,
            "src": "2313:140:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5783,
              "nodeType": "Block",
              "src": "2759:516:34",
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
                        "id": 5755,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5752,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "2834:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5753,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2834:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5754,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "2852:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2834:32:34",
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
                      "id": 5751,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "2826:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5756,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2826:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5757,
                  "nodeType": "ExpressionStatement",
                  "src": "2826:41:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5762,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2944:24:34",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 5759,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5704,
                            "src": "2945:10:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 5761,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5760,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5746,
                            "src": "2956:11:34",
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
                          "src": "2945:23:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 5758,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "2936:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5763,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2936:33:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5764,
                  "nodeType": "ExpressionStatement",
                  "src": "2936:33:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5769,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5765,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "3021:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5767,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5766,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3032:11:34",
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
                      "src": "3021:23:34",
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
                      "id": 5768,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3047:4:34",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "3021:30:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5770,
                  "nodeType": "ExpressionStatement",
                  "src": "3021:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5774,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3123:11:34",
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
                        "id": 5771,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "3106:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3106:16:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 5775,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3106:29:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5776,
                  "nodeType": "ExpressionStatement",
                  "src": "3106:29:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5778,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3223:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5779,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "3248:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5780,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3248:10:34",
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
                      "id": 5777,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5724,
                      "src": "3192:17:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5781,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3192:76:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5782,
                  "nodeType": "EmitStatement",
                  "src": "3187:81:34"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 5784,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5749,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5748,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "2745:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2745:9:34"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5747,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5746,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5784,
                  "src": "2699:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5745,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2699:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2698:21:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5750,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2759:0:34"
            },
            "scope": 5898,
            "src": "2669:606:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5822,
              "nodeType": "Block",
              "src": "3535:531:34",
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
                        "id": 5795,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5792,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "3610:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5793,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3610:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5794,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "3628:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3610:32:34",
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
                      "id": 5791,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "3602:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5796,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3602:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5797,
                  "nodeType": "ExpressionStatement",
                  "src": "3602:41:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 5799,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5704,
                          "src": "3703:10:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 5801,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 5800,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5786,
                          "src": "3714:11:34",
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
                        "src": "3703:23:34",
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
                      "id": 5798,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "3695:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5802,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3695:32:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5803,
                  "nodeType": "ExpressionStatement",
                  "src": "3695:32:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5807,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3826:30:34",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5804,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "3833:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5806,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5805,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5786,
                        "src": "3844:11:34",
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
                      "src": "3833:23:34",
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
                  "id": 5808,
                  "nodeType": "ExpressionStatement",
                  "src": "3826:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5809,
                      "name": "authorities",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5707,
                      "src": "3867:11:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 5812,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5786,
                          "src": "3900:11:34",
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
                          "id": 5810,
                          "name": "authorities",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5707,
                          "src": "3881:11:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 5811,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5375,
                        "src": "3881:18:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 5813,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3881:31:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "3867:45:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 5815,
                  "nodeType": "ExpressionStatement",
                  "src": "3867:45:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5817,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5786,
                        "src": "4014:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5818,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "4039:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5819,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4039:10:34",
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
                      "id": 5816,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5730,
                      "src": "3976:24:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3976:83:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5821,
                  "nodeType": "EmitStatement",
                  "src": "3971:88:34"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 5823,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5789,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5788,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "3521:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3521:9:34"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5787,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5786,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5823,
                  "src": "3475:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5785,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3475:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3474:21:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5790,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3535:0:34"
            },
            "scope": 5898,
            "src": "3442:624:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5887,
              "nodeType": "Block",
              "src": "4471:831:34",
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
                        "id": 5836,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5833,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "4546:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5834,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4546:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5835,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "4564:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4546:32:34",
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
                      "id": 5832,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4538:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5837,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4538:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5838,
                  "nodeType": "ExpressionStatement",
                  "src": "4538:41:34"
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
                        "id": 5843,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5840,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5827,
                          "src": "4666:6:34",
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
                            "id": 5841,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "4675:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5842,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4675:18:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4666:27:34",
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
                      "id": 5839,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4658:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5844,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4658:36:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5845,
                  "nodeType": "ExpressionStatement",
                  "src": "4658:36:34"
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
                        "id": 5851,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 5847,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "4787:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5849,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5848,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5827,
                            "src": "4799:6:34",
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
                          "src": "4787:19:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5850,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5825,
                          "src": "4810:11:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4787:34:34",
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
                      "id": 5846,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4779:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:43:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5853,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:43:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5857,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "4883:30:34",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5854,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "4890:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5856,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5855,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5825,
                        "src": "4901:11:34",
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
                      "src": "4890:23:34",
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
                  "id": 5858,
                  "nodeType": "ExpressionStatement",
                  "src": "4883:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5859,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "4989:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5860,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5827,
                        "src": "5001:6:34",
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
                      "src": "4989:19:34",
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
                        "id": 5862,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "5011:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5868,
                      "indexExpression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31",
                            "id": 5866,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "5046:1:34",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1_by_1",
                              "typeString": "int_const 1"
                            },
                            "value": "1"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1_by_1",
                              "typeString": "int_const 1"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 5863,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 5707,
                              "src": "5023:11:34",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 5864,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "length",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "5023:18:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 5865,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6438,
                          "src": "5023:22:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 5867,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5023:25:34",
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
                      "src": "5011:38:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "4989:60:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 5870,
                  "nodeType": "ExpressionStatement",
                  "src": "4989:60:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5879,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 5871,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "5102:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5873,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5102:18:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 5877,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5146:1:34",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5874,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "5123:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5875,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5123:18:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5876,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6438,
                        "src": "5123:22:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5878,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5123:25:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5102:46:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5880,
                  "nodeType": "ExpressionStatement",
                  "src": "5102:46:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5882,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5825,
                        "src": "5250:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5883,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "5275:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5884,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5275:10:34",
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
                      "id": 5881,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5730,
                      "src": "5212:24:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5885,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5212:83:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5886,
                  "nodeType": "EmitStatement",
                  "src": "5207:88:34"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 5888,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5830,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5829,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "4457:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4457:9:34"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5828,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5825,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5888,
                  "src": "4382:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5824,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4382:7:34",
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
                  "id": 5827,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 5888,
                  "src": "4411:14:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5826,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4411:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4372:59:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5831,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4471:0:34"
            },
            "scope": 5898,
            "src": "4333:969:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5896,
              "nodeType": "Block",
              "src": "5578:83:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5894,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5707,
                    "src": "5643:11:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 5893,
                  "id": 5895,
                  "nodeType": "Return",
                  "src": "5636:18:34"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.\n     * @return address[]   Array of authorized addresses",
            "id": 5897,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5889,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5506:2:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5893,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5892,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5897,
                  "src": "5556:9:34",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5890,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5556:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5891,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5556:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5555:18:34"
            },
            "scope": 5898,
            "src": "5475:186:34",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5899,
        "src": "1118:4545:34"
      }
    ],
    "src": "597:5067:34"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/lib/Authorizable.sol",
    "exportedSymbols": {
      "Authorizable": [
        5898
      ]
    },
    "id": 5899,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 5683,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:34"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 5685,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 6550,
        "src": "622:76:34",
        "symbolAliases": [
          {
            "foreign": 5684,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 5687,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 6464,
        "src": "699:73:34",
        "symbolAliases": [
          {
            "foreign": 5686,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../external/cryptofin/AddressArrayUtils.sol",
        "id": 5689,
        "nodeType": "ImportDirective",
        "scope": 5899,
        "sourceUnit": 5682,
        "src": "773:80:34",
        "symbolAliases": [
          {
            "foreign": 5688,
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
              "id": 5690,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6549,
              "src": "1147:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6549",
                "typeString": "contract Ownable"
              }
            },
            "id": 5691,
            "nodeType": "InheritanceSpecifier",
            "src": "1147:7:34"
          }
        ],
        "contractDependencies": [
          6549
        ],
        "contractKind": "contract",
        "documentation": "@title Authorizable\n@author Set Protocol\n * The Authorizable contract is an inherited contract that sets permissions on certain function calls\nthrough the onlyAuthorized modifier. Permissions can be managed only by the Owner of the contract.",
        "fullyImplemented": true,
        "id": 5898,
        "linearizedBaseContracts": [
          5898,
          6549
        ],
        "name": "Authorizable",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 5694,
            "libraryName": {
              "contractScope": null,
              "id": 5692,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6463,
              "src": "1167:8:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6463",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1161:27:34",
            "typeName": {
              "id": 5693,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1180:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "id": 5698,
            "libraryName": {
              "contractScope": null,
              "id": 5695,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5681,
              "src": "1199:17:34",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$5681",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1193:38:34",
            "typeName": {
              "baseType": {
                "id": 5696,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1221:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 5697,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1221:9:34",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "constant": false,
            "id": 5700,
            "name": "gracePeriodEnd",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1357:29:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 5699,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1357:7:34",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 5704,
            "name": "authorized",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1456:43:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 5703,
              "keyType": {
                "id": 5701,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1465:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "1456:25:34",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 5702,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "1476:4:34",
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
            "id": 5707,
            "name": "authorities",
            "nodeType": "VariableDeclaration",
            "scope": 5898,
            "src": "1543:28:34",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_array$_t_address_$dyn_storage",
              "typeString": "address[]"
            },
            "typeName": {
              "baseType": {
                "id": 5705,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1543:7:34",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 5706,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1543:9:34",
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
              "id": 5717,
              "nodeType": "Block",
              "src": "1723:59:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 5710,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5704,
                          "src": "1741:10:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 5713,
                        "indexExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5711,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7016,
                            "src": "1752:3:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 5712,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1752:10:34",
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
                        "src": "1741:22:34",
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
                      "id": 5709,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "1733:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5714,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1733:31:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5715,
                  "nodeType": "ExpressionStatement",
                  "src": "1733:31:34"
                },
                {
                  "id": 5716,
                  "nodeType": "PlaceholderStatement",
                  "src": "1774:1:34"
                }
              ]
            },
            "documentation": null,
            "id": 5718,
            "name": "onlyAuthorized",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 5708,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1723:0:34"
            },
            "src": "1699:83:34",
            "visibility": "internal"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5724,
            "name": "AddressAuthorized",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5723,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5720,
                  "indexed": true,
                  "name": "authAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 5724,
                  "src": "1919:27:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5719,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1919:7:34",
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
                  "id": 5722,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 5724,
                  "src": "1956:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5721,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1956:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1909:73:34"
            },
            "src": "1885:98:34"
          },
          {
            "anonymous": false,
            "documentation": null,
            "id": 5730,
            "name": "AuthorizedAddressRemoved",
            "nodeType": "EventDefinition",
            "parameters": {
              "id": 5729,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5726,
                  "indexed": true,
                  "name": "addressRemoved",
                  "nodeType": "VariableDeclaration",
                  "scope": 5730,
                  "src": "2081:30:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5725,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2081:7:34",
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
                  "id": 5728,
                  "indexed": false,
                  "name": "authorizedBy",
                  "nodeType": "VariableDeclaration",
                  "scope": 5730,
                  "src": "2121:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5727,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2121:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2071:76:34"
            },
            "src": "2040:108:34"
          },
          {
            "body": {
              "id": 5743,
              "nodeType": "Block",
              "src": "2386:67:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5741,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5735,
                      "name": "gracePeriodEnd",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5700,
                      "src": "2396:14:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 5739,
                          "name": "_gracePeriod",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5732,
                          "src": "2433:12:34",
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
                          "expression": {
                            "argumentTypes": null,
                            "id": 5736,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "2413:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5737,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2413:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5738,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "add",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6462,
                        "src": "2413:19:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5740,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2413:33:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2396:50:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5742,
                  "nodeType": "ExpressionStatement",
                  "src": "2396:50:34"
                }
              ]
            },
            "documentation": "@param  _gracePeriod   Time period in which authorizations can be added or removed",
            "id": 5744,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5733,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5732,
                  "name": "_gracePeriod",
                  "nodeType": "VariableDeclaration",
                  "scope": 5744,
                  "src": "2339:20:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5731,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2339:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2329:36:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5734,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2386:0:34"
            },
            "scope": 5898,
            "src": "2313:140:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 5783,
              "nodeType": "Block",
              "src": "2759:516:34",
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
                        "id": 5755,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5752,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "2834:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5753,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2834:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5754,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "2852:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2834:32:34",
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
                      "id": 5751,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "2826:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5756,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2826:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5757,
                  "nodeType": "ExpressionStatement",
                  "src": "2826:41:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5762,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "2944:24:34",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 5759,
                            "name": "authorized",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5704,
                            "src": "2945:10:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 5761,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5760,
                            "name": "_authTarget",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5746,
                            "src": "2956:11:34",
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
                          "src": "2945:23:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
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
                      "id": 5758,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "2936:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5763,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2936:33:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5764,
                  "nodeType": "ExpressionStatement",
                  "src": "2936:33:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5769,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5765,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "3021:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5767,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5766,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3032:11:34",
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
                      "src": "3021:23:34",
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
                      "id": 5768,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3047:4:34",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "3021:30:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 5770,
                  "nodeType": "ExpressionStatement",
                  "src": "3021:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5774,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3123:11:34",
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
                        "id": 5771,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "3106:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5773,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3106:16:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 5775,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3106:29:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5776,
                  "nodeType": "ExpressionStatement",
                  "src": "3106:29:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5778,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5746,
                        "src": "3223:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5779,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "3248:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5780,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "3248:10:34",
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
                      "id": 5777,
                      "name": "AddressAuthorized",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5724,
                      "src": "3192:17:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5781,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3192:76:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5782,
                  "nodeType": "EmitStatement",
                  "src": "3187:81:34"
                }
              ]
            },
            "documentation": "Add authorized address to contract. Can only be set by owner.\n     * @param  _authTarget   The address of the new authorized contract",
            "id": 5784,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5749,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5748,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "2745:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2745:9:34"
              }
            ],
            "name": "addAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5747,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5746,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5784,
                  "src": "2699:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5745,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2699:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2698:21:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5750,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2759:0:34"
            },
            "scope": 5898,
            "src": "2669:606:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5822,
              "nodeType": "Block",
              "src": "3535:531:34",
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
                        "id": 5795,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5792,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "3610:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5793,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3610:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5794,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "3628:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3610:32:34",
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
                      "id": 5791,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "3602:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5796,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3602:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5797,
                  "nodeType": "ExpressionStatement",
                  "src": "3602:41:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 5799,
                          "name": "authorized",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5704,
                          "src": "3703:10:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 5801,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 5800,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5786,
                          "src": "3714:11:34",
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
                        "src": "3703:23:34",
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
                      "id": 5798,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "3695:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5802,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3695:32:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5803,
                  "nodeType": "ExpressionStatement",
                  "src": "3695:32:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5807,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "3826:30:34",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5804,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "3833:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5806,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5805,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5786,
                        "src": "3844:11:34",
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
                      "src": "3833:23:34",
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
                  "id": 5808,
                  "nodeType": "ExpressionStatement",
                  "src": "3826:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 5809,
                      "name": "authorities",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5707,
                      "src": "3867:11:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_storage",
                        "typeString": "address[] storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 5812,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5786,
                          "src": "3900:11:34",
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
                          "id": 5810,
                          "name": "authorities",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5707,
                          "src": "3881:11:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 5811,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5375,
                        "src": "3881:18:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 5813,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "3881:31:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "3867:45:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 5815,
                  "nodeType": "ExpressionStatement",
                  "src": "3867:45:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5817,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5786,
                        "src": "4014:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5818,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "4039:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5819,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4039:10:34",
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
                      "id": 5816,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5730,
                      "src": "3976:24:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5820,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3976:83:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5821,
                  "nodeType": "EmitStatement",
                  "src": "3971:88:34"
                }
              ]
            },
            "documentation": "Remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned",
            "id": 5823,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5789,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5788,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "3521:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3521:9:34"
              }
            ],
            "name": "removeAuthorizedAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5787,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5786,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5823,
                  "src": "3475:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5785,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3475:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3474:21:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5790,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3535:0:34"
            },
            "scope": 5898,
            "src": "3442:624:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5887,
              "nodeType": "Block",
              "src": "4471:831:34",
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
                        "id": 5836,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5833,
                            "name": "block",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 7006,
                            "src": "4546:5:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_block",
                              "typeString": "block"
                            }
                          },
                          "id": 5834,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "timestamp",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4546:15:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "<",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5835,
                          "name": "gracePeriodEnd",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5700,
                          "src": "4564:14:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4546:32:34",
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
                      "id": 5832,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4538:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5837,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4538:41:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5838,
                  "nodeType": "ExpressionStatement",
                  "src": "4538:41:34"
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
                        "id": 5843,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 5840,
                          "name": "_index",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5827,
                          "src": "4666:6:34",
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
                            "id": 5841,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "4675:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5842,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "4675:18:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "4666:27:34",
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
                      "id": 5839,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4658:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5844,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4658:36:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5845,
                  "nodeType": "ExpressionStatement",
                  "src": "4658:36:34"
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
                        "id": 5851,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 5847,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "4787:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5849,
                          "indexExpression": {
                            "argumentTypes": null,
                            "id": 5848,
                            "name": "_index",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5827,
                            "src": "4799:6:34",
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
                          "src": "4787:19:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "id": 5850,
                          "name": "_authTarget",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5825,
                          "src": "4810:11:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        "src": "4787:34:34",
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
                      "id": 5846,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7019,
                        7020
                      ],
                      "referencedDeclaration": 7019,
                      "src": "4779:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 5852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4779:43:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5853,
                  "nodeType": "ExpressionStatement",
                  "src": "4779:43:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5857,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "delete",
                    "prefix": true,
                    "src": "4883:30:34",
                    "subExpression": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5854,
                        "name": "authorized",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5704,
                        "src": "4890:10:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 5856,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5855,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5825,
                        "src": "4901:11:34",
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
                      "src": "4890:23:34",
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
                  "id": 5858,
                  "nodeType": "ExpressionStatement",
                  "src": "4883:30:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5869,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 5859,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "4989:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5861,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 5860,
                        "name": "_index",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5827,
                        "src": "5001:6:34",
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
                      "src": "4989:19:34",
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
                        "id": 5862,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "5011:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5868,
                      "indexExpression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "hexValue": "31",
                            "id": 5866,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "5046:1:34",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_1_by_1",
                              "typeString": "int_const 1"
                            },
                            "value": "1"
                          }
                        ],
                        "expression": {
                          "argumentTypes": [
                            {
                              "typeIdentifier": "t_rational_1_by_1",
                              "typeString": "int_const 1"
                            }
                          ],
                          "expression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 5863,
                              "name": "authorities",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 5707,
                              "src": "5023:11:34",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 5864,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "length",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "5023:18:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "id": 5865,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sub",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 6438,
                          "src": "5023:22:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                            "typeString": "function (uint256,uint256) pure returns (uint256)"
                          }
                        },
                        "id": 5867,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "functionCall",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5023:25:34",
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
                      "src": "5011:38:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "4989:60:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 5870,
                  "nodeType": "ExpressionStatement",
                  "src": "4989:60:34"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5879,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 5871,
                        "name": "authorities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5707,
                        "src": "5102:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 5873,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "5102:18:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "hexValue": "31",
                          "id": 5877,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "5146:1:34",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          },
                          "value": "1"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_rational_1_by_1",
                            "typeString": "int_const 1"
                          }
                        ],
                        "expression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 5874,
                            "name": "authorities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 5707,
                            "src": "5123:11:34",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_storage",
                              "typeString": "address[] storage ref"
                            }
                          },
                          "id": 5875,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "5123:18:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "id": 5876,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sub",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 6438,
                        "src": "5123:22:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                          "typeString": "function (uint256,uint256) pure returns (uint256)"
                        }
                      },
                      "id": 5878,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "5123:25:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "5102:46:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 5880,
                  "nodeType": "ExpressionStatement",
                  "src": "5102:46:34"
                },
                {
                  "eventCall": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 5882,
                        "name": "_authTarget",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 5825,
                        "src": "5250:11:34",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 5883,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7016,
                          "src": "5275:3:34",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 5884,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5275:10:34",
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
                      "id": 5881,
                      "name": "AuthorizedAddressRemoved",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 5730,
                      "src": "5212:24:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_event_nonpayable$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,address)"
                      }
                    },
                    "id": 5885,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5212:83:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 5886,
                  "nodeType": "EmitStatement",
                  "src": "5207:88:34"
                }
              ]
            },
            "documentation": "More efficiently remove authorized address from contract. Can only be set by owner.\n     * @param  _authTarget   The address to be de-permissioned\n@param _index           The index of the _authTarget address in authorities",
            "id": 5888,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 5830,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 5829,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6497,
                  "src": "4457:9:34",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4457:9:34"
              }
            ],
            "name": "removeAuthorizedAddressAtIndex",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5828,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5825,
                  "name": "_authTarget",
                  "nodeType": "VariableDeclaration",
                  "scope": 5888,
                  "src": "4382:19:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 5824,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4382:7:34",
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
                  "id": 5827,
                  "name": "_index",
                  "nodeType": "VariableDeclaration",
                  "scope": 5888,
                  "src": "4411:14:34",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 5826,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4411:7:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4372:59:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5831,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4471:0:34"
            },
            "scope": 5898,
            "src": "4333:969:34",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 5896,
              "nodeType": "Block",
              "src": "5578:83:34",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 5894,
                    "name": "authorities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 5707,
                    "src": "5643:11:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "functionReturnParameters": 5893,
                  "id": 5895,
                  "nodeType": "Return",
                  "src": "5636:18:34"
                }
              ]
            },
            "documentation": "Get array of authorized addresses.\n     * @return address[]   Array of authorized addresses",
            "id": 5897,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": true,
            "modifiers": [],
            "name": "getAuthorizedAddresses",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 5889,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5506:2:34"
            },
            "payable": false,
            "returnParameters": {
              "id": 5893,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 5892,
                  "name": "",
                  "nodeType": "VariableDeclaration",
                  "scope": 5897,
                  "src": "5556:9:34",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 5890,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "5556:7:34",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 5891,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "5556:9:34",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5555:18:34"
            },
            "scope": 5898,
            "src": "5475:186:34",
            "stateMutability": "view",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 5899,
        "src": "1118:4545:34"
      }
    ],
    "src": "597:5067:34"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-23T23:58:05.604Z"
}