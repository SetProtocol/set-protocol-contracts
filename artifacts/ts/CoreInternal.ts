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
          "name": "_vault",
          "type": "address"
        }
      ],
      "name": "setVaultAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_transferProxy",
          "type": "address"
        }
      ],
      "name": "setTransferProxyAddress",
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
  "bytecode": "0x608060405260008054600160a060020a031916331790556109c0806100256000396000f3006080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561051d565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b861052f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610595565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566105a4565b34801561025a57600080fd5b50610156600160a060020a0360043516610603565b34801561027b57600080fd5b50610156600160a060020a036004351661071f565b34801561029c57600080fd5b5061021d610758565b3480156102b157600080fd5b50610156600160a060020a0360043516610767565b3480156102d257600080fd5b5061021d60ff600435166107e4565b3480156102ed57600080fd5b506102f6610802565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a0360043516610818565b34801561034957600080fd5b5061019160043561083b565b34801561036157600080fd5b5061021d61084d565b34801561037657600080fd5b506101b861085c565b34801561038b57600080fd5b50610121600160a060020a03600435166108bf565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a03821660009081526004602052604090205460ff16151561043657600080fd5b50600160a060020a0381166000908152600460205260408120805460ff191690555b6005548110156105195760058054600160a060020a03841691908390811061047c57fe5b600091825260209091200154600160a060020a03161415610511576005805460001981019081106104a957fe5b60009182526020909120015460058054600160a060020a0390921691839081106104cf57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560058054600019019061050b908261094d565b50610519565b600101610458565b5050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161056c575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146105bb57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461061b57600080fd5b600160a060020a03821660009081526006602052604090205460ff16151561064257600080fd5b50600160a060020a0381166000908152600660205260408120805460ff191690555b6007548110156105195760078054600160a060020a03841691908390811061068857fe5b600091825260209091200154600160a060020a03161415610717576007805460001981019081106106b557fe5b60009182526020909120015460078054600160a060020a0390921691839081106106db57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560078054600019019061050b908261094d565b600101610664565b600054600160a060020a0316331461073657600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461077e57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461082f57600080fd5b610838816108dd565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161056c575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156108f257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b81548183558181111561097157600083815260209020610971918101908301610976565b505050565b61059291905b80821115610990576000815560010161097c565b50905600a165627a7a7230582042002638e0d0e1e855b1b87115f76eb9f4b5ce283ea5cbf51611b608f437fbfa0029",
  "deployedBytecode": "0x6080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561051d565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b861052f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610595565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566105a4565b34801561025a57600080fd5b50610156600160a060020a0360043516610603565b34801561027b57600080fd5b50610156600160a060020a036004351661071f565b34801561029c57600080fd5b5061021d610758565b3480156102b157600080fd5b50610156600160a060020a0360043516610767565b3480156102d257600080fd5b5061021d60ff600435166107e4565b3480156102ed57600080fd5b506102f6610802565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a0360043516610818565b34801561034957600080fd5b5061019160043561083b565b34801561036157600080fd5b5061021d61084d565b34801561037657600080fd5b506101b861085c565b34801561038b57600080fd5b50610121600160a060020a03600435166108bf565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a03821660009081526004602052604090205460ff16151561043657600080fd5b50600160a060020a0381166000908152600460205260408120805460ff191690555b6005548110156105195760058054600160a060020a03841691908390811061047c57fe5b600091825260209091200154600160a060020a03161415610511576005805460001981019081106104a957fe5b60009182526020909120015460058054600160a060020a0390921691839081106104cf57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560058054600019019061050b908261094d565b50610519565b600101610458565b5050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161056c575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146105bb57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461061b57600080fd5b600160a060020a03821660009081526006602052604090205460ff16151561064257600080fd5b50600160a060020a0381166000908152600660205260408120805460ff191690555b6007548110156105195760078054600160a060020a03841691908390811061068857fe5b600091825260209091200154600160a060020a03161415610717576007805460001981019081106106b557fe5b60009182526020909120015460078054600160a060020a0390921691839081106106db57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560078054600019019061050b908261094d565b600101610664565b600054600160a060020a0316331461073657600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461077e57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461082f57600080fd5b610838816108dd565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161056c575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156108f257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b81548183558181111561097157600083815260209020610971918101908301610976565b505050565b61059291905b80821115610990576000815560010161097c565b50905600a165627a7a7230582042002638e0d0e1e855b1b87115f76eb9f4b5ce283ea5cbf51611b608f437fbfa0029",
  "sourceMap": "925:2967:12:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;925:2967:12;;;;;;",
  "deployedSourceMap": "925:2967:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:23;-1:-1:-1;;;;;2803:164:23;;;;;;;;;;;;;;;;;;;;;;;1526:235:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1526:235:12;-1:-1:-1;;;;;1526:235:12;;;;;;;2442:639;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2442:639:12;-1:-1:-1;;;;;2442:639:12;;;;;4385:167:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:23;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:23;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:23;;;;;;;;-1:-1:-1;;;;;2263:125:23;;;;;;;;;;;;;;1001:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:61;;;;3282:608:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3282:608:12;-1:-1:-1;;;;;3282:608:12;;;;;1170:195;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1170:195:12;-1:-1:-1;;;;;1170:195:12;;;;;238:20:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;1960:273:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1960:273:12;-1:-1:-1;;;;;1960:273:12;;;;;1985:161:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:23;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:23;;;;;;;;-1:-1:-1;;;;;1710:18:23;;;;;;;;;;;;;;;;;;;;;;;;1274:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1274:103:61;-1:-1:-1;;;;;1274:103:61;;;;;4011:163:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:23;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:23;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:23;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:23;-1:-1:-1;;;;;3409:146:23;;;;;2803:164;-1:-1:-1;;;;;2930:30:23;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;1526:235:12:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1718:19:12;:36;;-1:-1:-1;;;;;;1718:36:12;-1:-1:-1;;;;;1718:36:12;;;;;;;;;;1526:235::o;2442:639::-;2802:9;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2599:30:12;;;;;;:20;:30;;;;;;;;2591:39;;;;;;;;-1:-1:-1;;;;;;2692:30:12;;2725:5;2692:30;;;:20;:30;;;;;:38;;-1:-1:-1;;2692:38:12;;;2797:278;2821:15;:22;2817:26;;2797:278;;;2868:15;:18;;-1:-1:-1;;;;;2868:30:12;;;:15;2884:1;;2868:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2868:18:12;:30;2864:201;;;2939:15;2955:22;;-1:-1:-1;;2955:26:12;;;2939:43;;;;;;;;;;;;;;;;2918:15;:18;;-1:-1:-1;;;;;2939:43:12;;;;2934:1;;2918:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;2918:64:12;-1:-1:-1;;;;;2918:64:12;;;;;;;;;;3000:15;:27;;-1:-1:-1;;3000:27:12;;;;;;:::i;:::-;;3045:5;;2864:201;2845:3;;2797:278;;;2442:639;;:::o;4385:167:23:-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:23;;;;;;;;;;;;;;;;;;;;;;;3685:119;;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:23;2263:125;:::o;1001:111:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1077:5;;;1058:25;;-1:-1:-1;;;;;1077:5:61;;;;1058:25;;;1105:1;1089:18;;-1:-1:-1;;;;;;1089:18:61;;;1001:111::o;3282:608:12:-;3615:9;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;3444:21:12;;;;;;:15;:21;;;;;;;;3436:30;;;;;;;;-1:-1:-1;;;;;;3522:21:12;;3546:5;3522:21;;;:15;:21;;;;;:29;;-1:-1:-1;;3522:29:12;;;3610:274;3634:15;:22;3630:26;;3610:274;;;3681:15;:18;;-1:-1:-1;;;;;3681:26:12;;;:15;3697:1;;3681:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3681:18:12;:26;3677:197;;;3748:15;3764:22;;-1:-1:-1;;3764:26:12;;;3748:43;;;;;;;;;;;;;;;;3727:15;:18;;-1:-1:-1;;;;;3748:43:12;;;;3743:1;;3727:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;3727:64:12;-1:-1:-1;;;;;3727:64:12;;;;;;;;;;3809:15;:27;;-1:-1:-1;;3809:27:12;;;;;;:::i;3677:197::-;3658:3;;3610:274;;1170:195;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1338:11:12;:20;;-1:-1:-1;;;;;;1338:20:12;-1:-1:-1;;;;;1338:20:12;;;;;;;;;;1170:195::o;238:20:61:-;;;-1:-1:-1;;;;;238:20:61;;:::o;1960:273:12:-;719:5:61;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2114:30:12;;;;;:20;:30;;;;;:37;;-1:-1:-1;;2114:37:12;2147:4;2114:37;;;;;;2196:15;27:10:-1;;23:18;;;45:23;;2196:30:12;;;;;;;-1:-1:-1;;;;;;2196:30:12;;;;;;1960:273::o;1985:161:23:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:23;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:23;;;;;;:::o;1274:103:61:-;719:5;;-1:-1:-1;;;;;719:5:61;705:10;:19;697:28;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;4011:163:23:-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:23;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:23;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:23;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;1512:171:61:-;-1:-1:-1;;;;;1582:23:61;;;;1574:32;;;;;;1638:5;;;1617:38;;-1:-1:-1;;;;;1617:38:61;;;;1638:5;;;1617:38;;;1661:5;:17;;-1:-1:-1;;;;;;1661:17:61;-1:-1:-1;;;;;1661:17:61;;;;;;;;;;1512:171::o;925:2967:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state of variables that track\n * Core dependency addresses.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState\n{\n    /* ============ External Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vault = _vault;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxy = _transferProxy;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories. Can only be set by\n     * owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Mark as true in validFactories mapping\n        state.validFactories[_factory] = true;\n\n        // Add to factories array\n        state.factories.push(_factory);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories. Can only be disabled\n     * by owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Verify Factory is linked to Core\n        require(state.validFactories[_factory]);\n\n        // Mark as false in validFactories mapping\n        state.validFactories[_factory] = false;\n\n        // Find and remove factory from factories array\n        for (uint256 i = 0; i < state.factories.length; i++) {\n            if (state.factories[i] == _factory) {\n                state.factories[i] = state.factories[state.factories.length - 1];\n                state.factories.length -= 1;\n                break;\n            }\n        }\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens. Can only\n     * be disables by owner of Core.\n     *\n     * @param  _set   The address of the SetToken to disable\n     */\n    function disableSet(\n        address _set\n    )\n        external\n        onlyOwner\n    {\n        // Verify Set was created by Core and is enabled\n        require(state.validSets[_set]);\n\n        // Mark as false in validSet mapping\n        state.validSets[_set] = false;\n\n        // Find and remove from setTokens array\n        for (uint256 i = 0; i < state.setTokens.length; i++) {\n            if (state.setTokens[i] == _set) {\n                state.setTokens[i] = state.setTokens[state.setTokens.length - 1];\n                state.setTokens.length -= 1;\n                break;\n            }\n        }\n    }\n}\n",
  "sourcePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2008
      ]
    },
    "id": 2009,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1809,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1811,
        "nodeType": "ImportDirective",
        "scope": 2009,
        "sourceUnit": 6832,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1810,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1813,
        "nodeType": "ImportDirective",
        "scope": 2009,
        "sourceUnit": 3864,
        "src": "699:49:12",
        "symbolAliases": [
          {
            "foreign": 1812,
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
              "id": 1814,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6831,
              "src": "954:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6831",
                "typeString": "contract Ownable"
              }
            },
            "id": 1815,
            "nodeType": "InheritanceSpecifier",
            "src": "954:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1816,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3863,
              "src": "967:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3863",
                "typeString": "contract CoreState"
              }
            },
            "id": 1817,
            "nodeType": "InheritanceSpecifier",
            "src": "967:9:12"
          }
        ],
        "contractDependencies": [
          3863,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2008,
        "linearizedBaseContracts": [
          2008,
          3863,
          6831
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1830,
              "nodeType": "Block",
              "src": "1264:101:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1828,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1824,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3759,
                        "src": "1338:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3757_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1826,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3734,
                      "src": "1338:11:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1827,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1819,
                      "src": "1352:6:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1338:20:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1829,
                  "nodeType": "ExpressionStatement",
                  "src": "1338:20:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 1831,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1822,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1821,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "1250:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1250:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1820,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1819,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 1831,
                  "src": "1204:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1818,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1204:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1194:30:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1823,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:12"
            },
            "scope": 2008,
            "src": "1170:195:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1844,
              "nodeType": "Block",
              "src": "1636:125:12",
              "statements": [
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 1838,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3759,
                        "src": "1718:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3757_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1840,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3732,
                      "src": "1718:19:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1841,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1833,
                      "src": "1740:14:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1718:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1843,
                  "nodeType": "ExpressionStatement",
                  "src": "1718:36:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 1845,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1836,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1835,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "1622:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1622:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1834,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1833,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1845,
                  "src": "1568:22:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1832,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1568:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1558:38:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1636:0:12"
            },
            "scope": 2008,
            "src": "1526:235:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1868,
              "nodeType": "Block",
              "src": "2054:179:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1858,
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
                          "id": 1852,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2114:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1855,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3738,
                        "src": "2114:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1856,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1854,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1847,
                        "src": "2135:8:12",
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
                      "src": "2114:30:12",
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
                      "id": 1857,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2147:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2114:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1859,
                  "nodeType": "ExpressionStatement",
                  "src": "2114:37:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1865,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1847,
                        "src": "2217:8:12",
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
                          "id": 1860,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2196:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1863,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3741,
                        "src": "2196:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1864,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2196:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1866,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2196:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1867,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:30:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1869,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1850,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1849,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "2040:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2040:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1848,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1847,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1869,
                  "src": "1992:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1846,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1992:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1982:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1851,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2054:0:12"
            },
            "scope": 2008,
            "src": "1960:273:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1937,
              "nodeType": "Block",
              "src": "2537:544:12",
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
                            "id": 1877,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3759,
                            "src": "2599:5:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3757_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1878,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3738,
                          "src": "2599:20:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1880,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1879,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "2620:8:12",
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
                        "src": "2599:30:12",
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
                      "id": 1876,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2591:7:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1881,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2591:39:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1882,
                  "nodeType": "ExpressionStatement",
                  "src": "2591:39:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1889,
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
                          "id": 1883,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2692:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1886,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3738,
                        "src": "2692:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1887,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1885,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1871,
                        "src": "2713:8:12",
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
                      "src": "2692:30:12",
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
                      "id": 1888,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2725:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2692:38:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1890,
                  "nodeType": "ExpressionStatement",
                  "src": "2692:38:12"
                },
                {
                  "body": {
                    "id": 1935,
                    "nodeType": "Block",
                    "src": "2850:225:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1908,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1903,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3759,
                                "src": "2868:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3757_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1904,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3741,
                              "src": "2868:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1906,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1905,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1892,
                              "src": "2884:1:12",
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
                            "src": "2868:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1907,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1871,
                            "src": "2890:8:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2868:30:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1934,
                        "nodeType": "IfStatement",
                        "src": "2864:201:12",
                        "trueBody": {
                          "id": 1933,
                          "nodeType": "Block",
                          "src": "2900:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1922,
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
                                      "id": 1909,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "2918:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1912,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "2918:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1913,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1911,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1892,
                                    "src": "2934:1:12",
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
                                  "src": "2918:18:12",
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
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1914,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "2939:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1915,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "2939:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1921,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1920,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 1916,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3759,
                                          "src": "2955:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3757_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1917,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3741,
                                        "src": "2955:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1918,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2955:22:12",
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
                                      "id": 1919,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2980:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2955:26:12",
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
                                  "src": "2939:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2918:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1923,
                              "nodeType": "ExpressionStatement",
                              "src": "2918:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1930,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1924,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3000:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1927,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "3000:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1928,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3000:22:12",
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
                                  "id": 1929,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3026:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3000:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1931,
                              "nodeType": "ExpressionStatement",
                              "src": "3000:27:12"
                            },
                            {
                              "id": 1932,
                              "nodeType": "Break",
                              "src": "3045:5:12"
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
                    "id": 1899,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1895,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1892,
                      "src": "2817:1:12",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1896,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2821:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1897,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3741,
                        "src": "2821:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1898,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2817:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1936,
                  "initializationExpression": {
                    "assignments": [
                      1892
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1892,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1938,
                        "src": "2802:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1891,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2802:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1894,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1893,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2802:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1901,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2845:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1900,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1892,
                        "src": "2845:1:12",
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
                    "id": 1902,
                    "nodeType": "ExpressionStatement",
                    "src": "2845:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2797:278:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1938,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1874,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1873,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "2523:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2523:9:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1872,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1871,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1938,
                  "src": "2475:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1870,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2475:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2465:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1875,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2537:0:12"
            },
            "scope": 2008,
            "src": "2442:639:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2006,
              "nodeType": "Block",
              "src": "3369:521:12",
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
                            "id": 1946,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3759,
                            "src": "3444:5:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3757_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1947,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3745,
                          "src": "3444:15:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1949,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1948,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1940,
                          "src": "3460:4:12",
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
                        "src": "3444:21:12",
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
                      "id": 1945,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "3436:7:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3436:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1951,
                  "nodeType": "ExpressionStatement",
                  "src": "3436:30:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1958,
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
                          "id": 1952,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "3522:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1955,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3745,
                        "src": "3522:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1956,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1954,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1940,
                        "src": "3538:4:12",
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
                      "src": "3522:21:12",
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
                      "id": 1957,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3546:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3522:29:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1959,
                  "nodeType": "ExpressionStatement",
                  "src": "3522:29:12"
                },
                {
                  "body": {
                    "id": 2004,
                    "nodeType": "Block",
                    "src": "3663:221:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1977,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1972,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3759,
                                "src": "3681:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3757_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1973,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3748,
                              "src": "3681:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1975,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1974,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1961,
                              "src": "3697:1:12",
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
                            "src": "3681:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1976,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1940,
                            "src": "3703:4:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3681:26:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 2003,
                        "nodeType": "IfStatement",
                        "src": "3677:197:12",
                        "trueBody": {
                          "id": 2002,
                          "nodeType": "Block",
                          "src": "3709:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1991,
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
                                      "id": 1978,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3727:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1981,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3727:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1982,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1980,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1961,
                                    "src": "3743:1:12",
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
                                  "src": "3727:18:12",
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
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1983,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3748:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1984,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3748:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1990,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1989,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 1985,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3759,
                                          "src": "3764:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3757_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1986,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3748,
                                        "src": "3764:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1987,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3764:22:12",
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
                                      "id": 1988,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3789:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3764:26:12",
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
                                  "src": "3748:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3727:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1992,
                              "nodeType": "ExpressionStatement",
                              "src": "3727:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1999,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1993,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3809:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1996,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3809:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1997,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3809:22:12",
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
                                  "id": 1998,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3835:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3809:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2000,
                              "nodeType": "ExpressionStatement",
                              "src": "3809:27:12"
                            },
                            {
                              "id": 2001,
                              "nodeType": "Break",
                              "src": "3854:5:12"
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
                    "id": 1968,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1964,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1961,
                      "src": "3630:1:12",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1965,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "3634:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1966,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3748,
                        "src": "3634:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1967,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3634:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3630:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2005,
                  "initializationExpression": {
                    "assignments": [
                      1961
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1961,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 2007,
                        "src": "3615:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1960,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3615:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1963,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1962,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3627:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3615:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1970,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3658:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1969,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1961,
                        "src": "3658:1:12",
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
                    "id": 1971,
                    "nodeType": "ExpressionStatement",
                    "src": "3658:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3610:274:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2007,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1943,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1942,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "3355:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3355:9:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1941,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1940,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2007,
                  "src": "3311:12:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1939,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3311:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3301:28:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1944,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:12"
            },
            "scope": 2008,
            "src": "3282:608:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2009,
        "src": "925:2967:12"
      }
    ],
    "src": "597:3296:12"
  },
  "legacyAST": {
    "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2008
      ]
    },
    "id": 2009,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1809,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:12"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1811,
        "nodeType": "ImportDirective",
        "scope": 2009,
        "sourceUnit": 6832,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1810,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/alexsoong/Source/set-protocol/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1813,
        "nodeType": "ImportDirective",
        "scope": 2009,
        "sourceUnit": 3864,
        "src": "699:49:12",
        "symbolAliases": [
          {
            "foreign": 1812,
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
              "id": 1814,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6831,
              "src": "954:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6831",
                "typeString": "contract Ownable"
              }
            },
            "id": 1815,
            "nodeType": "InheritanceSpecifier",
            "src": "954:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1816,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3863,
              "src": "967:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3863",
                "typeString": "contract CoreState"
              }
            },
            "id": 1817,
            "nodeType": "InheritanceSpecifier",
            "src": "967:9:12"
          }
        ],
        "contractDependencies": [
          3863,
          6831
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2008,
        "linearizedBaseContracts": [
          2008,
          3863,
          6831
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1830,
              "nodeType": "Block",
              "src": "1264:101:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1828,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1824,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3759,
                        "src": "1338:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3757_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1826,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3734,
                      "src": "1338:11:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1827,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1819,
                      "src": "1352:6:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1338:20:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1829,
                  "nodeType": "ExpressionStatement",
                  "src": "1338:20:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 1831,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1822,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1821,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "1250:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1250:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1820,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1819,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 1831,
                  "src": "1204:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1818,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1204:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1194:30:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1823,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:12"
            },
            "scope": 2008,
            "src": "1170:195:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1844,
              "nodeType": "Block",
              "src": "1636:125:12",
              "statements": [
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
                      "expression": {
                        "argumentTypes": null,
                        "id": 1838,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3759,
                        "src": "1718:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3757_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1840,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3732,
                      "src": "1718:19:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1841,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1833,
                      "src": "1740:14:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1718:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1843,
                  "nodeType": "ExpressionStatement",
                  "src": "1718:36:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 1845,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1836,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1835,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "1622:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1622:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1834,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1833,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1845,
                  "src": "1568:22:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1832,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1568:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1558:38:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1837,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1636:0:12"
            },
            "scope": 2008,
            "src": "1526:235:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1868,
              "nodeType": "Block",
              "src": "2054:179:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1858,
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
                          "id": 1852,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2114:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1855,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3738,
                        "src": "2114:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1856,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1854,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1847,
                        "src": "2135:8:12",
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
                      "src": "2114:30:12",
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
                      "id": 1857,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2147:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2114:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1859,
                  "nodeType": "ExpressionStatement",
                  "src": "2114:37:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1865,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1847,
                        "src": "2217:8:12",
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
                          "id": 1860,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2196:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1863,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3741,
                        "src": "2196:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1864,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2196:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1866,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2196:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1867,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:30:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1869,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1850,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1849,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "2040:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2040:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1848,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1847,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1869,
                  "src": "1992:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1846,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1992:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1982:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1851,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2054:0:12"
            },
            "scope": 2008,
            "src": "1960:273:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1937,
              "nodeType": "Block",
              "src": "2537:544:12",
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
                            "id": 1877,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3759,
                            "src": "2599:5:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3757_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1878,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3738,
                          "src": "2599:20:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1880,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1879,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1871,
                          "src": "2620:8:12",
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
                        "src": "2599:30:12",
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
                      "id": 1876,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "2591:7:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1881,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2591:39:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1882,
                  "nodeType": "ExpressionStatement",
                  "src": "2591:39:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1889,
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
                          "id": 1883,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2692:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1886,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3738,
                        "src": "2692:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1887,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1885,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1871,
                        "src": "2713:8:12",
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
                      "src": "2692:30:12",
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
                      "id": 1888,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2725:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2692:38:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1890,
                  "nodeType": "ExpressionStatement",
                  "src": "2692:38:12"
                },
                {
                  "body": {
                    "id": 1935,
                    "nodeType": "Block",
                    "src": "2850:225:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1908,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1903,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3759,
                                "src": "2868:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3757_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1904,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3741,
                              "src": "2868:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1906,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1905,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1892,
                              "src": "2884:1:12",
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
                            "src": "2868:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1907,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1871,
                            "src": "2890:8:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2868:30:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1934,
                        "nodeType": "IfStatement",
                        "src": "2864:201:12",
                        "trueBody": {
                          "id": 1933,
                          "nodeType": "Block",
                          "src": "2900:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1922,
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
                                      "id": 1909,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "2918:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1912,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "2918:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1913,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1911,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1892,
                                    "src": "2934:1:12",
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
                                  "src": "2918:18:12",
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
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1914,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "2939:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1915,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "2939:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1921,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1920,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 1916,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3759,
                                          "src": "2955:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3757_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1917,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3741,
                                        "src": "2955:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1918,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2955:22:12",
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
                                      "id": 1919,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2980:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2955:26:12",
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
                                  "src": "2939:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2918:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1923,
                              "nodeType": "ExpressionStatement",
                              "src": "2918:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1930,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1924,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3000:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1927,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3741,
                                    "src": "3000:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1928,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3000:22:12",
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
                                  "id": 1929,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3026:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3000:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1931,
                              "nodeType": "ExpressionStatement",
                              "src": "3000:27:12"
                            },
                            {
                              "id": 1932,
                              "nodeType": "Break",
                              "src": "3045:5:12"
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
                    "id": 1899,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1895,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1892,
                      "src": "2817:1:12",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1896,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "2821:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1897,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3741,
                        "src": "2821:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1898,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2817:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1936,
                  "initializationExpression": {
                    "assignments": [
                      1892
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1892,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1938,
                        "src": "2802:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1891,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2802:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1894,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1893,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2802:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1901,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2845:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1900,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1892,
                        "src": "2845:1:12",
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
                    "id": 1902,
                    "nodeType": "ExpressionStatement",
                    "src": "2845:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2797:278:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1938,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1874,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1873,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "2523:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2523:9:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1872,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1871,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1938,
                  "src": "2475:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1870,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2475:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2465:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1875,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2537:0:12"
            },
            "scope": 2008,
            "src": "2442:639:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2006,
              "nodeType": "Block",
              "src": "3369:521:12",
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
                            "id": 1946,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 3759,
                            "src": "3444:5:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$3757_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 1947,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 3745,
                          "src": "3444:15:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 1949,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 1948,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1940,
                          "src": "3460:4:12",
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
                        "src": "3444:21:12",
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
                      "id": 1945,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7301,
                        7302
                      ],
                      "referencedDeclaration": 7301,
                      "src": "3436:7:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1950,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3436:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1951,
                  "nodeType": "ExpressionStatement",
                  "src": "3436:30:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1958,
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
                          "id": 1952,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "3522:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1955,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3745,
                        "src": "3522:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1956,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1954,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1940,
                        "src": "3538:4:12",
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
                      "src": "3522:21:12",
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
                      "id": 1957,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3546:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3522:29:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1959,
                  "nodeType": "ExpressionStatement",
                  "src": "3522:29:12"
                },
                {
                  "body": {
                    "id": 2004,
                    "nodeType": "Block",
                    "src": "3663:221:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1977,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "baseExpression": {
                              "argumentTypes": null,
                              "expression": {
                                "argumentTypes": null,
                                "id": 1972,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3759,
                                "src": "3681:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3757_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1973,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3748,
                              "src": "3681:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1975,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1974,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1961,
                              "src": "3697:1:12",
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
                            "src": "3681:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1976,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1940,
                            "src": "3703:4:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3681:26:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 2003,
                        "nodeType": "IfStatement",
                        "src": "3677:197:12",
                        "trueBody": {
                          "id": 2002,
                          "nodeType": "Block",
                          "src": "3709:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1991,
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
                                      "id": 1978,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3727:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1981,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3727:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1982,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1980,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1961,
                                    "src": "3743:1:12",
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
                                  "src": "3727:18:12",
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
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1983,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3748:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1984,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3748:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1990,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1989,
                                    "isConstant": false,
                                    "isLValue": false,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "leftExpression": {
                                      "argumentTypes": null,
                                      "expression": {
                                        "argumentTypes": null,
                                        "expression": {
                                          "argumentTypes": null,
                                          "id": 1985,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3759,
                                          "src": "3764:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3757_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1986,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3748,
                                        "src": "3764:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1987,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3764:22:12",
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
                                      "id": 1988,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3789:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3764:26:12",
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
                                  "src": "3748:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3727:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1992,
                              "nodeType": "ExpressionStatement",
                              "src": "3727:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1999,
                                "isConstant": false,
                                "isLValue": false,
                                "isPure": false,
                                "lValueRequested": false,
                                "leftHandSide": {
                                  "argumentTypes": null,
                                  "expression": {
                                    "argumentTypes": null,
                                    "expression": {
                                      "argumentTypes": null,
                                      "id": 1993,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3759,
                                      "src": "3809:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3757_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1996,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3748,
                                    "src": "3809:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1997,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3809:22:12",
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
                                  "id": 1998,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3835:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3809:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2000,
                              "nodeType": "ExpressionStatement",
                              "src": "3809:27:12"
                            },
                            {
                              "id": 2001,
                              "nodeType": "Break",
                              "src": "3854:5:12"
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
                    "id": 1968,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1964,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1961,
                      "src": "3630:1:12",
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
                        "expression": {
                          "argumentTypes": null,
                          "id": 1965,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3759,
                          "src": "3634:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3757_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1966,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3748,
                        "src": "3634:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1967,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3634:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3630:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2005,
                  "initializationExpression": {
                    "assignments": [
                      1961
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1961,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 2007,
                        "src": "3615:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1960,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3615:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1963,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1962,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3627:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3615:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1970,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3658:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1969,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1961,
                        "src": "3658:1:12",
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
                    "id": 1971,
                    "nodeType": "ExpressionStatement",
                    "src": "3658:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3610:274:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2007,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1943,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1942,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6779,
                  "src": "3355:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3355:9:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1941,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1940,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2007,
                  "src": "3311:12:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1939,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3311:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3301:28:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1944,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:12"
            },
            "scope": 2008,
            "src": "3282:608:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2009,
        "src": "925:2967:12"
      }
    ],
    "src": "597:3296:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-10T21:21:49.369Z"
}