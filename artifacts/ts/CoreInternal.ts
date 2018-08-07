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
  "bytecode": "0x608060405260008054600160a060020a031916331790556109c0806100256000396000f3006080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561051d565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b861052f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610595565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566105a4565b34801561025a57600080fd5b50610156600160a060020a0360043516610603565b34801561027b57600080fd5b50610156600160a060020a036004351661071f565b34801561029c57600080fd5b5061021d610758565b3480156102b157600080fd5b50610156600160a060020a0360043516610767565b3480156102d257600080fd5b5061021d60ff600435166107e4565b3480156102ed57600080fd5b506102f6610802565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a0360043516610818565b34801561034957600080fd5b5061019160043561083b565b34801561036157600080fd5b5061021d61084d565b34801561037657600080fd5b506101b861085c565b34801561038b57600080fd5b50610121600160a060020a03600435166108bf565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a03821660009081526004602052604090205460ff16151561043657600080fd5b50600160a060020a0381166000908152600460205260408120805460ff191690555b6005548110156105195760058054600160a060020a03841691908390811061047c57fe5b600091825260209091200154600160a060020a03161415610511576005805460001981019081106104a957fe5b60009182526020909120015460058054600160a060020a0390921691839081106104cf57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560058054600019019061050b908261094d565b50610519565b600101610458565b5050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161056c575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146105bb57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461061b57600080fd5b600160a060020a03821660009081526006602052604090205460ff16151561064257600080fd5b50600160a060020a0381166000908152600660205260408120805460ff191690555b6007548110156105195760078054600160a060020a03841691908390811061068857fe5b600091825260209091200154600160a060020a03161415610717576007805460001981019081106106b557fe5b60009182526020909120015460078054600160a060020a0390921691839081106106db57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560078054600019019061050b908261094d565b600101610664565b600054600160a060020a0316331461073657600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461077e57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461082f57600080fd5b610838816108dd565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161056c575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156108f257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b81548183558181111561097157600083815260209020610971918101908301610976565b505050565b61059291905b80821115610990576000815560010161097c565b50905600a165627a7a7230582024e9f30f23f9fb7d6561cc37b528acaa0b81374e0006b2cb5767e461b37ff53b0029",
  "deployedBytecode": "0x6080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561051d565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b861052f565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610595565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566105a4565b34801561025a57600080fd5b50610156600160a060020a0360043516610603565b34801561027b57600080fd5b50610156600160a060020a036004351661071f565b34801561029c57600080fd5b5061021d610758565b3480156102b157600080fd5b50610156600160a060020a0360043516610767565b3480156102d257600080fd5b5061021d60ff600435166107e4565b3480156102ed57600080fd5b506102f6610802565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a0360043516610818565b34801561034957600080fd5b5061019160043561083b565b34801561036157600080fd5b5061021d61084d565b34801561037657600080fd5b506101b861085c565b34801561038b57600080fd5b50610121600160a060020a03600435166108bf565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a03821660009081526004602052604090205460ff16151561043657600080fd5b50600160a060020a0381166000908152600460205260408120805460ff191690555b6005548110156105195760058054600160a060020a03841691908390811061047c57fe5b600091825260209091200154600160a060020a03161415610511576005805460001981019081106104a957fe5b60009182526020909120015460058054600160a060020a0390921691839081106104cf57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560058054600019019061050b908261094d565b50610519565b600101610458565b5050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161056c575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146105bb57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461061b57600080fd5b600160a060020a03821660009081526006602052604090205460ff16151561064257600080fd5b50600160a060020a0381166000908152600660205260408120805460ff191690555b6007548110156105195760078054600160a060020a03841691908390811061068857fe5b600091825260209091200154600160a060020a03161415610717576007805460001981019081106106b557fe5b60009182526020909120015460078054600160a060020a0390921691839081106106db57fe5b60009182526020909120018054600160a060020a031916600160a060020a039290921691909117905560078054600019019061050b908261094d565b600101610664565b600054600160a060020a0316331461073657600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461077e57600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a0316331461082f57600080fd5b610838816108dd565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561058a57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161056c575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a03811615156108f257600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b81548183558181111561097157600083815260209020610971918101908301610976565b505050565b61059291905b80821115610990576000815560010161097c565b50905600a165627a7a7230582024e9f30f23f9fb7d6561cc37b528acaa0b81374e0006b2cb5767e461b37ff53b0029",
  "sourceMap": "925:2967:4:-;;;567:5:20;:18;;-1:-1:-1;;;;;;567:18:20;575:10;567:18;;;925:2967:4;;;;;;",
  "deployedSourceMap": "925:2967:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:14;-1:-1:-1;;;;;2803:164:14;;;;;;;;;;;;;;;;;;;;;;;1526:235:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1526:235:4;-1:-1:-1;;;;;1526:235:4;;;;;;;2442:639;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2442:639:4;-1:-1:-1;;;;;2442:639:4;;;;;4376:164:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:14;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:14;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:14;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:14;;;;;;;;-1:-1:-1;;;;;2263:125:14;;;;;;;;;;;;;;827:111:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:20;;;;3282:608:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3282:608:4;-1:-1:-1;;;;;3282:608:4;;;;;1170:195;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1170:195:4;-1:-1:-1;;;;;1170:195:4;;;;;238:20:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:20;;;;1960:273:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1960:273:4;-1:-1:-1;;;;;1960:273:4;;;;;1985:161:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:14;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:14;;;;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;;;;;;;;;;;;;;;;;;;1100:103:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:20;-1:-1:-1;;;;;1100:103:20;;;;;4008:160:14;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:14;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:14;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:14;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:14;-1:-1:-1;;;;;3409:146:14;;;;;2803:164;-1:-1:-1;;;;;2930:30:14;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;1526:235:4:-;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;1718:19:4;:36;;-1:-1:-1;;;;;;1718:36:4;-1:-1:-1;;;;;1718:36:4;;;;;;;;;;1526:235::o;2442:639::-;2802:9;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2599:30:4;;;;;;:20;:30;;;;;;;;2591:39;;;;;;;;-1:-1:-1;;;;;;2692:30:4;;2725:5;2692:30;;;:20;:30;;;;;:38;;-1:-1:-1;;2692:38:4;;;2797:278;2821:15;:22;2817:26;;2797:278;;;2868:15;:18;;-1:-1:-1;;;;;2868:30:4;;;:15;2884:1;;2868:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2868:18:4;:30;2864:201;;;2939:15;2955:22;;-1:-1:-1;;2955:26:4;;;2939:43;;;;;;;;;;;;;;;;2918:15;:18;;-1:-1:-1;;;;;2939:43:4;;;;2934:1;;2918:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;2918:64:4;-1:-1:-1;;;;;2918:64:4;;;;;;;;;;3000:15;:27;;-1:-1:-1;;3000:27:4;;;;;;:::i;:::-;;3045:5;;2864:201;2845:3;;2797:278;;;2442:639;;:::o;4376:164:14:-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:14;;;;;;;;;;;;;;;;;;;;;;;3685:119;;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:14;2263:125;:::o;827:111:20:-;719:5;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:20;;;;884:25;;;931:1;915:18;;-1:-1:-1;;;;;;915:18:20;;;827:111::o;3282:608:4:-;3615:9;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;3444:21:4;;;;;;:15;:21;;;;;;;;3436:30;;;;;;;;-1:-1:-1;;;;;;3522:21:4;;3546:5;3522:21;;;:15;:21;;;;;:29;;-1:-1:-1;;3522:29:4;;;3610:274;3634:15;:22;3630:26;;3610:274;;;3681:15;:18;;-1:-1:-1;;;;;3681:26:4;;;:15;3697:1;;3681:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3681:18:4;:26;3677:197;;;3748:15;3764:22;;-1:-1:-1;;3764:26:4;;;3748:43;;;;;;;;;;;;;;;;3727:15;:18;;-1:-1:-1;;;;;3748:43:4;;;;3743:1;;3727:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;3727:64:4;-1:-1:-1;;;;;3727:64:4;;;;;;;;;;3809:15;:27;;-1:-1:-1;;3809:27:4;;;;;;:::i;3677:197::-;3658:3;;3610:274;;1170:195;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;1338:11:4;:20;;-1:-1:-1;;;;;;1338:20:4;-1:-1:-1;;;;;1338:20:4;;;;;;;;;;1170:195::o;238:20:20:-;;;-1:-1:-1;;;;;238:20:20;;:::o;1960:273:4:-;719:5:20;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2114:30:4;;;;;:20;:30;;;;;:37;;-1:-1:-1;;2114:37:4;2147:4;2114:37;;;;;;2196:15;27:10:-1;;23:18;;;45:23;;2196:30:4;;;;;;;-1:-1:-1;;;;;;2196:30:4;;;;;;1960:273::o;1985:161:14:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:14;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:14;;;;;;:::o;1100:103:20:-;719:5;;-1:-1:-1;;;;;719:5:20;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;4008:160:14:-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:14;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:14;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:14;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;1338:171:20:-;-1:-1:-1;;;;;1408:23:20;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:20;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;;;;;1487:17:20;-1:-1:-1;;;;;1487:17:20;;;;;;;;;;1338:171::o;925:2967:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state of variables that track\n * Core dependency addresses.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState\n{\n    /* ============ External Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vault = _vault;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxy = _transferProxy;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories. Can only be set by\n     * owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Mark as true in validFactories mapping\n        state.validFactories[_factory] = true;\n\n        // Add to factories array\n        state.factories.push(_factory);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories. Can only be disabled\n     * by owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Verify Factory is linked to Core\n        require(state.validFactories[_factory]);\n\n        // Mark as false in validFactories mapping\n        state.validFactories[_factory] = false;\n\n        // Find and remove factory from factories array\n        for (uint256 i = 0; i < state.factories.length; i++) {\n            if (state.factories[i] == _factory) {\n                state.factories[i] = state.factories[state.factories.length - 1];\n                state.factories.length -= 1;\n                break;\n            }\n        }\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens. Can only\n     * be disables by owner of Core.\n     *\n     * @param  _set   The address of the SetToken to disable\n     */\n    function disableSet(\n        address _set\n    )\n        external\n        onlyOwner\n    {\n        // Verify Set was created by Core and is enabled\n        require(state.validSets[_set]);\n\n        // Mark as false in validSet mapping\n        state.validSets[_set] = false;\n\n        // Find and remove from setTokens array\n        for (uint256 i = 0; i < state.setTokens.length; i++) {\n            if (state.setTokens[i] == _set) {\n                state.setTokens[i] = state.setTokens[state.setTokens.length - 1];\n                state.setTokens.length -= 1;\n                break;\n            }\n        }\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        600
      ]
    },
    "id": 601,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 401,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 403,
        "nodeType": "ImportDirective",
        "scope": 601,
        "sourceUnit": 2724,
        "src": "622:76:4",
        "symbolAliases": [
          {
            "foreign": 402,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 405,
        "nodeType": "ImportDirective",
        "scope": 601,
        "sourceUnit": 2094,
        "src": "699:49:4",
        "symbolAliases": [
          {
            "foreign": 404,
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
              "id": 406,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2723,
              "src": "954:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$2723",
                "typeString": "contract Ownable"
              }
            },
            "id": 407,
            "nodeType": "InheritanceSpecifier",
            "src": "954:7:4"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 408,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "967:9:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 409,
            "nodeType": "InheritanceSpecifier",
            "src": "967:9:4"
          }
        ],
        "contractDependencies": [
          2093,
          2723
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 600,
        "linearizedBaseContracts": [
          600,
          2093,
          2723
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 422,
              "nodeType": "Block",
              "src": "1264:101:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 420,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 416,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "1338:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 418,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1964,
                      "src": "1338:11:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 419,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 411,
                      "src": "1352:6:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1338:20:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 421,
                  "nodeType": "ExpressionStatement",
                  "src": "1338:20:4"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 423,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 414,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 413,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1250:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1250:9:4"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 412,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 411,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 423,
                  "src": "1204:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 410,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1204:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1194:30:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 415,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:4"
            },
            "scope": 600,
            "src": "1170:195:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 436,
              "nodeType": "Block",
              "src": "1636:125:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 434,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 430,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "1718:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 432,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1962,
                      "src": "1718:19:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 433,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 425,
                      "src": "1740:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1718:36:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 435,
                  "nodeType": "ExpressionStatement",
                  "src": "1718:36:4"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 437,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 428,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 427,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1622:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1622:9:4"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 425,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 437,
                  "src": "1568:22:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 424,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1568:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1558:38:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1636:0:4"
            },
            "scope": 600,
            "src": "1526:235:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 460,
              "nodeType": "Block",
              "src": "2054:179:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 450,
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
                          "id": 444,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2114:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 447,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1968,
                        "src": "2114:20:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 448,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 446,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 439,
                        "src": "2135:8:4",
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
                      "src": "2114:30:4",
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
                      "id": 449,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2147:4:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2114:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 451,
                  "nodeType": "ExpressionStatement",
                  "src": "2114:37:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 457,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 439,
                        "src": "2217:8:4",
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
                          "id": 452,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2196:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 455,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1971,
                        "src": "2196:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 456,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2196:20:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 458,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2196:30:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 459,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:30:4"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 461,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 442,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 441,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "2040:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2040:9:4"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 440,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 439,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 461,
                  "src": "1992:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 438,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1992:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1982:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 443,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2054:0:4"
            },
            "scope": 600,
            "src": "1960:273:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 529,
              "nodeType": "Block",
              "src": "2537:544:4",
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
                            "id": 469,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "2599:5:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 470,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1968,
                          "src": "2599:20:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 472,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 471,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 463,
                          "src": "2620:8:4",
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
                        "src": "2599:30:4",
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
                      "id": 468,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "2591:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 473,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2591:39:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 474,
                  "nodeType": "ExpressionStatement",
                  "src": "2591:39:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 481,
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
                          "id": 475,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2692:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 478,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1968,
                        "src": "2692:20:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 479,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 477,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 463,
                        "src": "2713:8:4",
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
                      "src": "2692:30:4",
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
                      "id": 480,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2725:5:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2692:38:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 482,
                  "nodeType": "ExpressionStatement",
                  "src": "2692:38:4"
                },
                {
                  "body": {
                    "id": 527,
                    "nodeType": "Block",
                    "src": "2850:225:4",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 500,
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
                                "id": 495,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1989,
                                "src": "2868:5:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$1987_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 496,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1971,
                              "src": "2868:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 498,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 497,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 484,
                              "src": "2884:1:4",
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
                            "src": "2868:18:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 499,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 463,
                            "src": "2890:8:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2868:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 526,
                        "nodeType": "IfStatement",
                        "src": "2864:201:4",
                        "trueBody": {
                          "id": 525,
                          "nodeType": "Block",
                          "src": "2900:165:4",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 514,
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
                                      "id": 501,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "2918:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 504,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "2918:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 505,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 503,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 484,
                                    "src": "2934:1:4",
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
                                  "src": "2918:18:4",
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
                                      "id": 506,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "2939:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 507,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "2939:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 513,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 512,
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
                                          "id": 508,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 1989,
                                          "src": "2955:5:4",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$1987_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 509,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 1971,
                                        "src": "2955:15:4",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 510,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2955:22:4",
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
                                      "id": 511,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2980:1:4",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2955:26:4",
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
                                  "src": "2939:43:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2918:64:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 515,
                              "nodeType": "ExpressionStatement",
                              "src": "2918:64:4"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 522,
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
                                      "id": 516,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3000:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 519,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "3000:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 520,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3000:22:4",
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
                                  "id": 521,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3026:1:4",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3000:27:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 523,
                              "nodeType": "ExpressionStatement",
                              "src": "3000:27:4"
                            },
                            {
                              "id": 524,
                              "nodeType": "Break",
                              "src": "3045:5:4"
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
                    "id": 491,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 487,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 484,
                      "src": "2817:1:4",
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
                          "id": 488,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2821:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 489,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1971,
                        "src": "2821:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 490,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2817:26:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 528,
                  "initializationExpression": {
                    "assignments": [
                      484
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 484,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 530,
                        "src": "2802:9:4",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 483,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2802:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 486,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2802:13:4"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 493,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2845:3:4",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 492,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 484,
                        "src": "2845:1:4",
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
                    "id": 494,
                    "nodeType": "ExpressionStatement",
                    "src": "2845:3:4"
                  },
                  "nodeType": "ForStatement",
                  "src": "2797:278:4"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 530,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 466,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 465,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "2523:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2523:9:4"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 463,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 530,
                  "src": "2475:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2475:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2465:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 467,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2537:0:4"
            },
            "scope": 600,
            "src": "2442:639:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 598,
              "nodeType": "Block",
              "src": "3369:521:4",
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
                            "id": 538,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "3444:5:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 539,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1975,
                          "src": "3444:15:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 541,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 540,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 532,
                          "src": "3460:4:4",
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
                        "src": "3444:21:4",
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
                      "id": 537,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "3436:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 542,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3436:30:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 543,
                  "nodeType": "ExpressionStatement",
                  "src": "3436:30:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 550,
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
                          "id": 544,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "3522:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 547,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1975,
                        "src": "3522:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 548,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 546,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 532,
                        "src": "3538:4:4",
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
                      "src": "3522:21:4",
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
                      "id": 549,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3546:5:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3522:29:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 551,
                  "nodeType": "ExpressionStatement",
                  "src": "3522:29:4"
                },
                {
                  "body": {
                    "id": 596,
                    "nodeType": "Block",
                    "src": "3663:221:4",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 569,
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
                                "id": 564,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1989,
                                "src": "3681:5:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$1987_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 565,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1978,
                              "src": "3681:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 567,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 566,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 553,
                              "src": "3697:1:4",
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
                            "src": "3681:18:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 568,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 532,
                            "src": "3703:4:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3681:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 595,
                        "nodeType": "IfStatement",
                        "src": "3677:197:4",
                        "trueBody": {
                          "id": 594,
                          "nodeType": "Block",
                          "src": "3709:165:4",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 583,
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
                                      "id": 570,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3727:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 573,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3727:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 574,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 572,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 553,
                                    "src": "3743:1:4",
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
                                  "src": "3727:18:4",
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
                                      "id": 575,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3748:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 576,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3748:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 582,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 581,
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
                                          "id": 577,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 1989,
                                          "src": "3764:5:4",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$1987_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 578,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 1978,
                                        "src": "3764:15:4",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 579,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3764:22:4",
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
                                      "id": 580,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3789:1:4",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3764:26:4",
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
                                  "src": "3748:43:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3727:64:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 584,
                              "nodeType": "ExpressionStatement",
                              "src": "3727:64:4"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 591,
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
                                      "id": 585,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3809:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 588,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3809:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 589,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3809:22:4",
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
                                  "id": 590,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3835:1:4",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3809:27:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 592,
                              "nodeType": "ExpressionStatement",
                              "src": "3809:27:4"
                            },
                            {
                              "id": 593,
                              "nodeType": "Break",
                              "src": "3854:5:4"
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
                    "id": 560,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 556,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 553,
                      "src": "3630:1:4",
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
                          "id": 557,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "3634:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 558,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1978,
                        "src": "3634:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 559,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3634:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3630:26:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 597,
                  "initializationExpression": {
                    "assignments": [
                      553
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 553,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 599,
                        "src": "3615:9:4",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 552,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3615:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 555,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 554,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3627:1:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3615:13:4"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 562,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3658:3:4",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 561,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 553,
                        "src": "3658:1:4",
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
                    "id": 563,
                    "nodeType": "ExpressionStatement",
                    "src": "3658:3:4"
                  },
                  "nodeType": "ForStatement",
                  "src": "3610:274:4"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 599,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 535,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 534,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "3355:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3355:9:4"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 533,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 532,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 599,
                  "src": "3311:12:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3311:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3301:28:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 536,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:4"
            },
            "scope": 600,
            "src": "3282:608:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 601,
        "src": "925:2967:4"
      }
    ],
    "src": "597:3296:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        600
      ]
    },
    "id": 601,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 401,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 403,
        "nodeType": "ImportDirective",
        "scope": 601,
        "sourceUnit": 2724,
        "src": "622:76:4",
        "symbolAliases": [
          {
            "foreign": 402,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 405,
        "nodeType": "ImportDirective",
        "scope": 601,
        "sourceUnit": 2094,
        "src": "699:49:4",
        "symbolAliases": [
          {
            "foreign": 404,
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
              "id": 406,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2723,
              "src": "954:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$2723",
                "typeString": "contract Ownable"
              }
            },
            "id": 407,
            "nodeType": "InheritanceSpecifier",
            "src": "954:7:4"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 408,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2093,
              "src": "967:9:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2093",
                "typeString": "contract CoreState"
              }
            },
            "id": 409,
            "nodeType": "InheritanceSpecifier",
            "src": "967:9:4"
          }
        ],
        "contractDependencies": [
          2093,
          2723
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 600,
        "linearizedBaseContracts": [
          600,
          2093,
          2723
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 422,
              "nodeType": "Block",
              "src": "1264:101:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 420,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 416,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "1338:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 418,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1964,
                      "src": "1338:11:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 419,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 411,
                      "src": "1352:6:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1338:20:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 421,
                  "nodeType": "ExpressionStatement",
                  "src": "1338:20:4"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 423,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 414,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 413,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1250:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1250:9:4"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 412,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 411,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 423,
                  "src": "1204:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 410,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1204:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1194:30:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 415,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1264:0:4"
            },
            "scope": 600,
            "src": "1170:195:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 436,
              "nodeType": "Block",
              "src": "1636:125:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 434,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 430,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1989,
                        "src": "1718:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$1987_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 432,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 1962,
                      "src": "1718:19:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 433,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 425,
                      "src": "1740:14:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1718:36:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 435,
                  "nodeType": "ExpressionStatement",
                  "src": "1718:36:4"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 437,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 428,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 427,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "1622:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1622:9:4"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 426,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 425,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 437,
                  "src": "1568:22:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 424,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1568:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1558:38:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 429,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1636:0:4"
            },
            "scope": 600,
            "src": "1526:235:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 460,
              "nodeType": "Block",
              "src": "2054:179:4",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 450,
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
                          "id": 444,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2114:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 447,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1968,
                        "src": "2114:20:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 448,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 446,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 439,
                        "src": "2135:8:4",
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
                      "src": "2114:30:4",
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
                      "id": 449,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2147:4:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2114:37:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 451,
                  "nodeType": "ExpressionStatement",
                  "src": "2114:37:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 457,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 439,
                        "src": "2217:8:4",
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
                          "id": 452,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2196:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 455,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1971,
                        "src": "2196:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 456,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2196:20:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 458,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2196:30:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 459,
                  "nodeType": "ExpressionStatement",
                  "src": "2196:30:4"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 461,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 442,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 441,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "2040:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2040:9:4"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 440,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 439,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 461,
                  "src": "1992:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 438,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1992:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1982:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 443,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2054:0:4"
            },
            "scope": 600,
            "src": "1960:273:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 529,
              "nodeType": "Block",
              "src": "2537:544:4",
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
                            "id": 469,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "2599:5:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 470,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validFactories",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1968,
                          "src": "2599:20:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 472,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 471,
                          "name": "_factory",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 463,
                          "src": "2620:8:4",
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
                        "src": "2599:30:4",
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
                      "id": 468,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "2591:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 473,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2591:39:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 474,
                  "nodeType": "ExpressionStatement",
                  "src": "2591:39:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 481,
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
                          "id": 475,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2692:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 478,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1968,
                        "src": "2692:20:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 479,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 477,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 463,
                        "src": "2713:8:4",
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
                      "src": "2692:30:4",
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
                      "id": 480,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2725:5:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2692:38:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 482,
                  "nodeType": "ExpressionStatement",
                  "src": "2692:38:4"
                },
                {
                  "body": {
                    "id": 527,
                    "nodeType": "Block",
                    "src": "2850:225:4",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 500,
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
                                "id": 495,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1989,
                                "src": "2868:5:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$1987_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 496,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1971,
                              "src": "2868:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 498,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 497,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 484,
                              "src": "2884:1:4",
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
                            "src": "2868:18:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 499,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 463,
                            "src": "2890:8:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2868:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 526,
                        "nodeType": "IfStatement",
                        "src": "2864:201:4",
                        "trueBody": {
                          "id": 525,
                          "nodeType": "Block",
                          "src": "2900:165:4",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 514,
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
                                      "id": 501,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "2918:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 504,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "2918:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 505,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 503,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 484,
                                    "src": "2934:1:4",
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
                                  "src": "2918:18:4",
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
                                      "id": 506,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "2939:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 507,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "2939:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 513,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 512,
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
                                          "id": 508,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 1989,
                                          "src": "2955:5:4",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$1987_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 509,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 1971,
                                        "src": "2955:15:4",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 510,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2955:22:4",
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
                                      "id": 511,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2980:1:4",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2955:26:4",
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
                                  "src": "2939:43:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2918:64:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 515,
                              "nodeType": "ExpressionStatement",
                              "src": "2918:64:4"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 522,
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
                                      "id": 516,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3000:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 519,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1971,
                                    "src": "3000:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 520,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3000:22:4",
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
                                  "id": 521,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3026:1:4",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3000:27:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 523,
                              "nodeType": "ExpressionStatement",
                              "src": "3000:27:4"
                            },
                            {
                              "id": 524,
                              "nodeType": "Break",
                              "src": "3045:5:4"
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
                    "id": 491,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 487,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 484,
                      "src": "2817:1:4",
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
                          "id": 488,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "2821:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 489,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1971,
                        "src": "2821:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 490,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2821:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2817:26:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 528,
                  "initializationExpression": {
                    "assignments": [
                      484
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 484,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 530,
                        "src": "2802:9:4",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 483,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2802:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 486,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2814:1:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2802:13:4"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 493,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2845:3:4",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 492,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 484,
                        "src": "2845:1:4",
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
                    "id": 494,
                    "nodeType": "ExpressionStatement",
                    "src": "2845:3:4"
                  },
                  "nodeType": "ForStatement",
                  "src": "2797:278:4"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 530,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 466,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 465,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "2523:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2523:9:4"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 464,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 463,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 530,
                  "src": "2475:16:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2475:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2465:32:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 467,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2537:0:4"
            },
            "scope": 600,
            "src": "2442:639:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 598,
              "nodeType": "Block",
              "src": "3369:521:4",
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
                            "id": 538,
                            "name": "state",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1989,
                            "src": "3444:5:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_struct$_State_$1987_storage",
                              "typeString": "struct CoreState.State storage ref"
                            }
                          },
                          "id": 539,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "validSets",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": 1975,
                          "src": "3444:15:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                            "typeString": "mapping(address => bool)"
                          }
                        },
                        "id": 541,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 540,
                          "name": "_set",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 532,
                          "src": "3460:4:4",
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
                        "src": "3444:21:4",
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
                      "id": 537,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        2741,
                        2742
                      ],
                      "referencedDeclaration": 2741,
                      "src": "3436:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 542,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3436:30:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 543,
                  "nodeType": "ExpressionStatement",
                  "src": "3436:30:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 550,
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
                          "id": 544,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "3522:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 547,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1975,
                        "src": "3522:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 548,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 546,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 532,
                        "src": "3538:4:4",
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
                      "src": "3522:21:4",
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
                      "id": 549,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3546:5:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3522:29:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 551,
                  "nodeType": "ExpressionStatement",
                  "src": "3522:29:4"
                },
                {
                  "body": {
                    "id": 596,
                    "nodeType": "Block",
                    "src": "3663:221:4",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 569,
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
                                "id": 564,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1989,
                                "src": "3681:5:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$1987_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 565,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 1978,
                              "src": "3681:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 567,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 566,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 553,
                              "src": "3697:1:4",
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
                            "src": "3681:18:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 568,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 532,
                            "src": "3703:4:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3681:26:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 595,
                        "nodeType": "IfStatement",
                        "src": "3677:197:4",
                        "trueBody": {
                          "id": 594,
                          "nodeType": "Block",
                          "src": "3709:165:4",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 583,
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
                                      "id": 570,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3727:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 573,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3727:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 574,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 572,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 553,
                                    "src": "3743:1:4",
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
                                  "src": "3727:18:4",
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
                                      "id": 575,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3748:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 576,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3748:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 582,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 581,
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
                                          "id": 577,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 1989,
                                          "src": "3764:5:4",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$1987_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 578,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 1978,
                                        "src": "3764:15:4",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 579,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3764:22:4",
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
                                      "id": 580,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3789:1:4",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3764:26:4",
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
                                  "src": "3748:43:4",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3727:64:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 584,
                              "nodeType": "ExpressionStatement",
                              "src": "3727:64:4"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 591,
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
                                      "id": 585,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 1989,
                                      "src": "3809:5:4",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$1987_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 588,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 1978,
                                    "src": "3809:15:4",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 589,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3809:22:4",
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
                                  "id": 590,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3835:1:4",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3809:27:4",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 592,
                              "nodeType": "ExpressionStatement",
                              "src": "3809:27:4"
                            },
                            {
                              "id": 593,
                              "nodeType": "Break",
                              "src": "3854:5:4"
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
                    "id": 560,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 556,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 553,
                      "src": "3630:1:4",
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
                          "id": 557,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 1989,
                          "src": "3634:5:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$1987_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 558,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 1978,
                        "src": "3634:15:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 559,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3634:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3630:26:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 597,
                  "initializationExpression": {
                    "assignments": [
                      553
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 553,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 599,
                        "src": "3615:9:4",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 552,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3615:7:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 555,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 554,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3627:1:4",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3615:13:4"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 562,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3658:3:4",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 561,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 553,
                        "src": "3658:1:4",
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
                    "id": 563,
                    "nodeType": "ExpressionStatement",
                    "src": "3658:3:4"
                  },
                  "nodeType": "ForStatement",
                  "src": "3610:274:4"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 599,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 535,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 534,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2671,
                  "src": "3355:9:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3355:9:4"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 533,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 532,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 599,
                  "src": "3311:12:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 531,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3311:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3301:28:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 536,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:4"
            },
            "scope": 600,
            "src": "3282:608:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 601,
        "src": "925:2967:4"
      }
    ],
    "src": "597:3296:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-07T05:35:59.436Z"
}