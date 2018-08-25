export const CoreInternal = 
{
  "contractName": "CoreInternal",
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
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "enableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_factory",
          "type": "address"
        }
      ],
      "name": "disableFactory",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_set",
          "type": "address"
        }
      ],
      "name": "disableSet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a03191633179055610aa0806100256000396000f3006080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea5780631a1f2b3e1461011f5780631e912bd614610142578063559ed3391461016c5780636e667db3146101d1578063715018a61461020257806377274ff0146102175780638da5cb5b146102385780639f80ee881461024d578063a003e0691461026e578063c19d93fb14610289578063f2fde38b146102c4578063f7213db6146102e5578063fbfa77cf146102fd578063fe5b38e414610312578063fef3ee7314610327575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610348565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a0360043516610366565b005b34801561014e57600080fd5b5061015a600435610449565b60408051918252519081900360200190f35b34801561017857600080fd5b5061018161045b565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101bd5781810151838201526020016101a5565b505050509050019250505060405180910390f35b3480156101dd57600080fd5b506101e66104c1565b60408051600160a060020a039092168252519081900360200190f35b34801561020e57600080fd5b506101406104d0565b34801561022357600080fd5b50610140600160a060020a036004351661053c565b34801561024457600080fd5b506101e6610619565b34801561025957600080fd5b50610140600160a060020a0360043516610628565b34801561027a57600080fd5b506101e660ff600435166106b2565b34801561029557600080fd5b5061029e6106d0565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102d057600080fd5b50610140600160a060020a03600435166106e6565b3480156102f157600080fd5b5061015a600435610709565b34801561030957600080fd5b506101e661071b565b34801561031e57600080fd5b5061018161072a565b34801561033357600080fd5b5061010b600160a060020a036004351661078d565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461037d57600080fd5b600160a060020a03811660009081526004602052604090205460ff1615156103a457600080fd5b600160a060020a038116600090815260046020908152604091829020805460ff19169055600580548351818402810184019094528084526104319385939092919083018282801561041e57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610400575b50505050506107ab90919063ffffffff16565b8051610445916005916020909101906109d1565b5050565b60009081526009602052604090205490565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610498575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146104e757600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461055357600080fd5b600160a060020a03811660009081526006602052604090205460ff16151561057a57600080fd5b600160a060020a038116600090815260066020908152604091829020805460ff19169055600780548351818402810184019094528084526106059385939092919083018282801561041e57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116104005750505050506107ab90919063ffffffff16565b8051610445916007916020909101906109d1565b600054600160a060020a031681565b600054600160a060020a0316331461063f57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff19169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146106fd57600080fd5b610706816107e1565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610498575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b606060008060606107bc868661085e565b925092508115156107cc57600080fd5b6107d686846108c5565b509695505050505050565b600160a060020a03811615156107f657600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108b45784600160a060020a0316868281518110151561088757fe5b90602001906020020151600160a060020a031614156108ac57806001935093506108bc565b600101610867565b600093508392505b50509250929050565b60606000806060600086519250600183036040519080825280602002602001820160405280156108ff578160200160208202803883390190505b509150600090505b8581101561095457868181518110151561091d57fe5b90602001906020020151828281518110151561093557fe5b600160a060020a03909216602092830290910190910152600101610907565b50600185015b828110156109aa57868181518110151561097057fe5b90602001906020020151826001830381518110151561098b57fe5b600160a060020a0390921660209283029091019091015260010161095a565b8187878151811015156109b957fe5b90602001906020020151945094505050509250929050565b828054828255906000526020600020908101928215610a33579160200282015b82811115610a33578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039091161782556020909201916001909101906109f1565b50610a3f929150610a43565b5090565b6104be91905b80821115610a3f57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610a495600a165627a7a72305820b040f7daa38bc3e91242f8998bebb5350fb4738b691a09c7d5a2090c2a2f847f0029",
  "deployedBytecode": "0x6080604052600436106100e55763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100ea5780631a1f2b3e1461011f5780631e912bd614610142578063559ed3391461016c5780636e667db3146101d1578063715018a61461020257806377274ff0146102175780638da5cb5b146102385780639f80ee881461024d578063a003e0691461026e578063c19d93fb14610289578063f2fde38b146102c4578063f7213db6146102e5578063fbfa77cf146102fd578063fe5b38e414610312578063fef3ee7314610327575b600080fd5b3480156100f657600080fd5b5061010b600160a060020a0360043516610348565b604080519115158252519081900360200190f35b34801561012b57600080fd5b50610140600160a060020a0360043516610366565b005b34801561014e57600080fd5b5061015a600435610449565b60408051918252519081900360200190f35b34801561017857600080fd5b5061018161045b565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101bd5781810151838201526020016101a5565b505050509050019250505060405180910390f35b3480156101dd57600080fd5b506101e66104c1565b60408051600160a060020a039092168252519081900360200190f35b34801561020e57600080fd5b506101406104d0565b34801561022357600080fd5b50610140600160a060020a036004351661053c565b34801561024457600080fd5b506101e6610619565b34801561025957600080fd5b50610140600160a060020a0360043516610628565b34801561027a57600080fd5b506101e660ff600435166106b2565b34801561029557600080fd5b5061029e6106d0565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102d057600080fd5b50610140600160a060020a03600435166106e6565b3480156102f157600080fd5b5061015a600435610709565b34801561030957600080fd5b506101e661071b565b34801561031e57600080fd5b5061018161072a565b34801561033357600080fd5b5061010b600160a060020a036004351661078d565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a0316331461037d57600080fd5b600160a060020a03811660009081526004602052604090205460ff1615156103a457600080fd5b600160a060020a038116600090815260046020908152604091829020805460ff19169055600580548351818402810184019094528084526104319385939092919083018282801561041e57602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610400575b50505050506107ab90919063ffffffff16565b8051610445916005916020909101906109d1565b5050565b60009081526009602052604090205490565b606060016006018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610498575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146104e757600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a26000805473ffffffffffffffffffffffffffffffffffffffff19169055565b600054600160a060020a0316331461055357600080fd5b600160a060020a03811660009081526006602052604090205460ff16151561057a57600080fd5b600160a060020a038116600090815260066020908152604091829020805460ff19169055600780548351818402810184019094528084526106059385939092919083018282801561041e57602002820191906000526020600020908154600160a060020a031681526001909101906020018083116104005750505050506107ab90919063ffffffff16565b8051610445916007916020909101906109d1565b600054600160a060020a031681565b600054600160a060020a0316331461063f57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff19169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146106fd57600080fd5b610706816107e1565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b606060016004018054806020026020016040519081016040528092919081815260200182805480156104b657602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610498575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b606060008060606107bc868661085e565b925092508115156107cc57600080fd5b6107d686846108c5565b509695505050505050565b600160a060020a03811615156107f657600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b81516000908190815b818110156108b45784600160a060020a0316868281518110151561088757fe5b90602001906020020151600160a060020a031614156108ac57806001935093506108bc565b600101610867565b600093508392505b50509250929050565b60606000806060600086519250600183036040519080825280602002602001820160405280156108ff578160200160208202803883390190505b509150600090505b8581101561095457868181518110151561091d57fe5b90602001906020020151828281518110151561093557fe5b600160a060020a03909216602092830290910190910152600101610907565b50600185015b828110156109aa57868181518110151561097057fe5b90602001906020020151826001830381518110151561098b57fe5b600160a060020a0390921660209283029091019091015260010161095a565b8187878151811015156109b957fe5b90602001906020020151945094505050509250929050565b828054828255906000526020600020908101928215610a33579160200282015b82811115610a33578251825473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039091161782556020909201916001909101906109f1565b50610a3f929150610a43565b5090565b6104be91905b80821115610a3f57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610a495600a165627a7a72305820b040f7daa38bc3e91242f8998bebb5350fb4738b691a09c7d5a2090c2a2f847f0029",
  "sourceMap": "1009:1828:8:-;;;567:5:43;:18;;-1:-1:-1;;;;;;567:18:43;575:10;567:18;;;1009:1828:8;;;;;;",
  "deployedSourceMap": "1009:1828:8:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:19;-1:-1:-1;;;;;2803:164:19;;;;;;;;;;;;;;;;;;;;;;;1841:412:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1841:412:8;-1:-1:-1;;;;;1841:412:8;;;;;;;4385:167:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:19;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:19;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:19;;;;;;;;-1:-1:-1;;;;;2263:125:19;;;;;;;;;;;;;;1001:111:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:43;;;;2454:381:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2454:381:8;-1:-1:-1;;;;;2454:381:8;;;;;238:20:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:43;;;;1359:273:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1359:273:8;-1:-1:-1;;;;;1359:273:8;;;;;1985:161:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:19;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:19;;;;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;;;;;;;;;;;;;;;;;;;1274:103:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:43;-1:-1:-1;;;;;1274:103:43;;;;;4011:163:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:19;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:19;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:19;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:19;-1:-1:-1;;;;;3409:146:19;;;;;2803:164;-1:-1:-1;;;;;2930:30:19;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;1841:412:8:-;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1998:30:8;;;;;;:20;:30;;;;;;;;1990:39;;;;;;;;-1:-1:-1;;;;;2091:30:8;;2124:5;2091:30;;;:20;:30;;;;;;;;;:38;;-1:-1:-1;;2091:38:8;;;2214:15;:22;;;;;;;;;;;;;;;;;:32;;2112:8;;2214:22;;:15;:22;;;:15;:22;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2214:22:8;;;;;;;;;;;;;;;;;;;;;;;:32;;;;:::i;:::-;2196:50;;;;:15;;:50;;;;;;:::i;:::-;;1841:412;:::o;4385:167:19:-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:19;;;;;;;;;;;;;;;;;;;;;;;3685:119;;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:19;2263:125;:::o;1001:111:43:-;719:5;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:43;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;1089:18:43;;;1001:111::o;2454:381:8:-;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2616:21:8;;;;;;:15;:21;;;;;;;;2608:30;;;;;;;;-1:-1:-1;;;;;2694:21:8;;2718:5;2694:21;;;:15;:21;;;;;;;;;:29;;-1:-1:-1;;2694:29:8;;;2800:15;:22;;;;;;;;;;;;;;;;;:28;;2710:4;;2800:22;;:15;:22;;;:15;:22;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2800:22:8;;;;;;;;;;;;;;;;;;;;;;:28;;;;:::i;:::-;2782:46;;;;:15;;:46;;;;;;:::i;238:20:43:-;;;-1:-1:-1;;;;;238:20:43;;:::o;1359:273:8:-;719:5:43;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1513:30:8;;;;;:20;:30;;;;;:37;;-1:-1:-1;;1513:37:8;1546:4;1513:37;;;;;;1595:15;27:10:-1;;23:18;;;45:23;;1595:30:8;;;;;;;-1:-1:-1;;1595:30:8;;;;;;1359:273::o;1985:161:19:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:19;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;:::o;1274:103:43:-;719:5;;-1:-1:-1;;;;;719:5:43;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;4011:163:19:-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:19;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:19;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:19;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;6618:270:33:-;6700:9;6727:13;6742:9;6823:19;6755:13;6763:1;6766;6755:7;:13::i;:::-;6726:42;;;;6779:4;6778:5;6774:110;;;6793:8;;;6774:110;6847:13;6851:1;6854:5;6847:3;:13::i;:::-;-1:-1:-1;6822:38:33;6618:270;-1:-1:-1;;;;;;6618:270:33:o;1512:171:43:-;-1:-1:-1;;;;;1582:23:43;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:43;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;1661:17:43;-1:-1:-1;;;;;1661:17:43;;;;;;;;;;1512:171::o;293:251:33:-;402:8;;364:7;;;;;416:101;440:6;436:1;:10;416:101;;;473:1;-1:-1:-1;;;;;465:9:33;:1;467;465:4;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;465:9:33;;461:50;;;494:1;497:4;486:16;;;;;;461:50;448:3;;416:101;;;530:1;;-1:-1:-1;530:1:33;;-1:-1:-1;293:251:33;;;;;;;;:::o;6158:409::-;6241:9;6259:7;6276:14;6307:29;6375:9;6293:1;:8;6276:25;;6362:1;6353:6;:10;6339:25;;;;;;;;;;;;;;;;;;;;;;29:2:-1;21:6;17:15;117:4;105:10;97:6;88:34;136:17;;-1:-1;6339:25:33;;6307:57;;6387:1;6375:13;;6370:73;6394:5;6390:1;:9;6370:73;;;6432:1;6434;6432:4;;;;;;;;;;;;;;;;;;6414:12;6427:1;6414:15;;;;;;;;;;-1:-1:-1;;;;;6414:22:33;;;:15;;;;;;;;;;:22;6401:3;;6370:73;;;-1:-1:-1;6465:1:33;6457:9;;6448:78;6472:6;6468:1;:10;6448:78;;;6515:1;6517;6515:4;;;;;;;;;;;;;;;;;;6493:12;6510:1;6506;:5;6493:19;;;;;;;;;;-1:-1:-1;;;;;6493:26:33;;;:19;;;;;;;;;;:26;6480:3;;6448:78;;;6539:12;6553:1;6555:5;6553:8;;;;;;;;;;;;;;;;;;6531:31;;;;6158:409;;;;;;;;:::o;1009:1828:8:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1009:1828:8;-1:-1:-1;;;;;1009:1828:8;;;;;;;;;;;-1:-1:-1;1009:1828:8;;;;;;;-1:-1:-1;1009:1828:8;;;-1:-1:-1;1009:1828:8;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;-1:-1:-1;;1009:1828:8;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { AddressArrayUtils } from \"../../external/cryptofin/AddressArrayUtils.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state of variables that track\n * Core dependency addresses.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState\n{\n    using AddressArrayUtils for address[];\n    /* ============ External Functions ============ */\n\n    /**\n     * Add a factory to the mapping of tracked factories. Can only be set by\n     * owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Mark as true in validFactories mapping\n        state.validFactories[_factory] = true;\n\n        // Add to factories array\n        state.factories.push(_factory);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories. Can only be disabled\n     * by owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Verify Factory is linked to Core\n        require(state.validFactories[_factory]);\n\n        // Mark as false in validFactories mapping\n        state.validFactories[_factory] = false;\n\n        // Find and remove factory from factories array\n        state.factories = state.factories.remove(_factory);\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens. Can only\n     * be disables by owner of Core.\n     *\n     * @param  _set   The address of the SetToken to disable\n     */\n    function disableSet(\n        address _set\n    )\n        external\n        onlyOwner\n    {\n        // Verify Set was created by Core and is enabled\n        require(state.validSets[_set]);\n\n        // Mark as false in validSet mapping\n        state.validSets[_set] = false;\n\n        // Find and remove from setTokens array\n        state.setTokens = state.setTokens.remove(_set);\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1856
      ]
    },
    "id": 1857,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1751,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1753,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 6604,
        "src": "622:76:8",
        "symbolAliases": [
          {
            "foreign": 1752,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1755,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 3750,
        "src": "699:49:8",
        "symbolAliases": [
          {
            "foreign": 1754,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../../external/cryptofin/AddressArrayUtils.sol",
        "id": 1757,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 5729,
        "src": "749:83:8",
        "symbolAliases": [
          {
            "foreign": 1756,
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
              "id": 1758,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6603,
              "src": "1038:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6603",
                "typeString": "contract Ownable"
              }
            },
            "id": 1759,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:7:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1760,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3749,
              "src": "1051:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3749",
                "typeString": "contract CoreState"
              }
            },
            "id": 1761,
            "nodeType": "InheritanceSpecifier",
            "src": "1051:9:8"
          }
        ],
        "contractDependencies": [
          3749,
          6603
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 1856,
        "linearizedBaseContracts": [
          1856,
          3749,
          6603
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1765,
            "libraryName": {
              "contractScope": null,
              "id": 1762,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5728,
              "src": "1073:17:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$5728",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1067:38:8",
            "typeName": {
              "baseType": {
                "id": 1763,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1095:7:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 1764,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1095:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "body": {
              "id": 1788,
              "nodeType": "Block",
              "src": "1453:179:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1778,
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
                          "id": 1772,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "1513:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1775,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3624,
                        "src": "1513:20:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1776,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1774,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1767,
                        "src": "1534:8:8",
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
                      "src": "1513:30:8",
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
                      "id": 1777,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1546:4:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1513:37:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1779,
                  "nodeType": "ExpressionStatement",
                  "src": "1513:37:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1785,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1767,
                        "src": "1616:8:8",
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
                          "id": 1780,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "1595:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1783,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3627,
                        "src": "1595:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1784,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1595:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1786,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1595:30:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1787,
                  "nodeType": "ExpressionStatement",
                  "src": "1595:30:8"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1789,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1770,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1769,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "1439:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1439:9:8"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1768,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1767,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1789,
                  "src": "1391:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1766,
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
                }
              ],
              "src": "1381:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1771,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1453:0:8"
            },
            "scope": 1856,
            "src": "1359:273:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1821,
              "nodeType": "Block",
              "src": "1936:317:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1797,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "1998:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1798,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3624,
                          "src": "1998:20:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1800,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1799,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1791,
                          "src": "2019:8:8",
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
                        "src": "1998:30:8",
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
                      "id": 1796,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "1990:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1801,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1990:39:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1802,
                  "nodeType": "ExpressionStatement",
                  "src": "1990:39:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1809,
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
                          "id": 1803,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "2091:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1806,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3624,
                        "src": "2091:20:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1807,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1805,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1791,
                        "src": "2112:8:8",
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
                      "src": "2091:30:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1808,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2124:5:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2091:38:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1810,
                  "nodeType": "ExpressionStatement",
                  "src": "2091:38:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1819,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1811,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3645,
                        "src": "2196:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3643_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1813,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "factories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3627,
                      "src": "2196:15:8",
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
                          "id": 1817,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1791,
                          "src": "2237:8:8",
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
                            "id": 1814,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2214:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1815,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "factories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3627,
                          "src": "2214:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 1816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5422,
                        "src": "2214:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 1818,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2214:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2196:50:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 1820,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:50:8"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1822,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1794,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1793,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "1922:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1922:9:8"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1791,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1822,
                  "src": "1874:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1790,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1874:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1864:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1795,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1936:0:8"
            },
            "scope": 1856,
            "src": "1841:412:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1854,
              "nodeType": "Block",
              "src": "2541:294:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1830,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2616:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1831,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3631,
                          "src": "2616:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1833,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1832,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1824,
                          "src": "2632:4:8",
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
                        "src": "2616:21:8",
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
                      "id": 1829,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "2608:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1834,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2608:30:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1835,
                  "nodeType": "ExpressionStatement",
                  "src": "2608:30:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1842,
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
                          "id": 1836,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "2694:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1839,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3631,
                        "src": "2694:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1840,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1838,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1824,
                        "src": "2710:4:8",
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
                      "src": "2694:21:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1841,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2718:5:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2694:29:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1843,
                  "nodeType": "ExpressionStatement",
                  "src": "2694:29:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1844,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3645,
                        "src": "2782:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3643_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1846,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "setTokens",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3634,
                      "src": "2782:15:8",
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
                          "id": 1850,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1824,
                          "src": "2823:4:8",
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
                            "id": 1847,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2800:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1848,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setTokens",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3634,
                          "src": "2800:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 1849,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5422,
                        "src": "2800:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 1851,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2800:28:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2782:46:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 1853,
                  "nodeType": "ExpressionStatement",
                  "src": "2782:46:8"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 1855,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1827,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1826,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "2527:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2527:9:8"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1825,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1824,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 1855,
                  "src": "2483:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1823,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2483:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2473:28:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1828,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2541:0:8"
            },
            "scope": 1856,
            "src": "2454:381:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1857,
        "src": "1009:1828:8"
      }
    ],
    "src": "597:2241:8"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1856
      ]
    },
    "id": 1857,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1751,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1753,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 6604,
        "src": "622:76:8",
        "symbolAliases": [
          {
            "foreign": 1752,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1755,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 3750,
        "src": "699:49:8",
        "symbolAliases": [
          {
            "foreign": 1754,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/external/cryptofin/AddressArrayUtils.sol",
        "file": "../../external/cryptofin/AddressArrayUtils.sol",
        "id": 1757,
        "nodeType": "ImportDirective",
        "scope": 1857,
        "sourceUnit": 5729,
        "src": "749:83:8",
        "symbolAliases": [
          {
            "foreign": 1756,
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
              "id": 1758,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6603,
              "src": "1038:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6603",
                "typeString": "contract Ownable"
              }
            },
            "id": 1759,
            "nodeType": "InheritanceSpecifier",
            "src": "1038:7:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1760,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3749,
              "src": "1051:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3749",
                "typeString": "contract CoreState"
              }
            },
            "id": 1761,
            "nodeType": "InheritanceSpecifier",
            "src": "1051:9:8"
          }
        ],
        "contractDependencies": [
          3749,
          6603
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 1856,
        "linearizedBaseContracts": [
          1856,
          3749,
          6603
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1765,
            "libraryName": {
              "contractScope": null,
              "id": 1762,
              "name": "AddressArrayUtils",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5728,
              "src": "1073:17:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_AddressArrayUtils_$5728",
                "typeString": "library AddressArrayUtils"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1067:38:8",
            "typeName": {
              "baseType": {
                "id": 1763,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "1095:7:8",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "id": 1764,
              "length": null,
              "nodeType": "ArrayTypeName",
              "src": "1095:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                "typeString": "address[]"
              }
            }
          },
          {
            "body": {
              "id": 1788,
              "nodeType": "Block",
              "src": "1453:179:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1778,
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
                          "id": 1772,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "1513:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1775,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3624,
                        "src": "1513:20:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1776,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1774,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1767,
                        "src": "1534:8:8",
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
                      "src": "1513:30:8",
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
                      "id": 1777,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "1546:4:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "1513:37:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1779,
                  "nodeType": "ExpressionStatement",
                  "src": "1513:37:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1785,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1767,
                        "src": "1616:8:8",
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
                          "id": 1780,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "1595:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1783,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3627,
                        "src": "1595:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1784,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "1595:20:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1786,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1595:30:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1787,
                  "nodeType": "ExpressionStatement",
                  "src": "1595:30:8"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1789,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1770,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1769,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "1439:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1439:9:8"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1768,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1767,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1789,
                  "src": "1391:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1766,
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
                }
              ],
              "src": "1381:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1771,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1453:0:8"
            },
            "scope": 1856,
            "src": "1359:273:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1821,
              "nodeType": "Block",
              "src": "1936:317:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1797,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "1998:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1798,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3624,
                          "src": "1998:20:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1800,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1799,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1791,
                          "src": "2019:8:8",
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
                        "src": "1998:30:8",
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
                      "id": 1796,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "1990:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1801,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1990:39:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1802,
                  "nodeType": "ExpressionStatement",
                  "src": "1990:39:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1809,
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
                          "id": 1803,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "2091:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1806,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3624,
                        "src": "2091:20:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1807,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1805,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1791,
                        "src": "2112:8:8",
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
                      "src": "2091:30:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1808,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2124:5:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2091:38:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1810,
                  "nodeType": "ExpressionStatement",
                  "src": "2091:38:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1819,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1811,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3645,
                        "src": "2196:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3643_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1813,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "factories",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3627,
                      "src": "2196:15:8",
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
                          "id": 1817,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1791,
                          "src": "2237:8:8",
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
                            "id": 1814,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2214:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1815,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "factories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3627,
                          "src": "2214:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 1816,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5422,
                        "src": "2214:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 1818,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2214:32:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2196:50:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 1820,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:50:8"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1822,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1794,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1793,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "1922:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1922:9:8"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1792,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1791,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1822,
                  "src": "1874:16:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1790,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1874:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1864:32:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1795,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1936:0:8"
            },
            "scope": 1856,
            "src": "1841:412:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1854,
              "nodeType": "Block",
              "src": "2541:294:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1830,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2616:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1831,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3631,
                          "src": "2616:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1833,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1832,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1824,
                          "src": "2632:4:8",
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
                        "src": "2616:21:8",
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
                      "id": 1829,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "2608:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1834,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2608:30:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1835,
                  "nodeType": "ExpressionStatement",
                  "src": "2608:30:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1842,
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
                          "id": 1836,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "2694:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1839,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3631,
                        "src": "2694:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1840,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1838,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1824,
                        "src": "2710:4:8",
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
                      "src": "2694:21:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "66616c7365",
                      "id": 1841,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2718:5:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2694:29:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1843,
                  "nodeType": "ExpressionStatement",
                  "src": "2694:29:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1852,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1844,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3645,
                        "src": "2782:5:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3643_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1846,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "setTokens",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3634,
                      "src": "2782:15:8",
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
                          "id": 1850,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1824,
                          "src": "2823:4:8",
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
                            "id": 1847,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3645,
                            "src": "2800:5:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3643_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1848,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "setTokens",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3634,
                          "src": "2800:15:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_array$_t_address_$dyn_storage",
                            "typeString": "address[] storage ref"
                          }
                        },
                        "id": 1849,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "remove",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 5422,
                        "src": "2800:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_pure$_t_array$_t_address_$dyn_memory_ptr_$_t_address_$returns$_t_array$_t_address_$dyn_memory_ptr_$bound_to$_t_array$_t_address_$dyn_memory_ptr_$",
                          "typeString": "function (address[] memory,address) pure returns (address[] memory)"
                        }
                      },
                      "id": 1851,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "2800:28:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                        "typeString": "address[] memory"
                      }
                    },
                    "src": "2782:46:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                      "typeString": "address[] storage ref"
                    }
                  },
                  "id": 1853,
                  "nodeType": "ExpressionStatement",
                  "src": "2782:46:8"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 1855,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1827,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1826,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6551,
                  "src": "2527:9:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2527:9:8"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1825,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1824,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 1855,
                  "src": "2483:12:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1823,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2483:7:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2473:28:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1828,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2541:0:8"
            },
            "scope": 1856,
            "src": "2454:381:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1857,
        "src": "1009:1828:8"
      }
    ],
    "src": "597:2241:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-25T17:34:39.485Z"
}