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
  "bytecode": "0x608060405260008054600160a060020a03191633179055610b7b806100256000396000f3006080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561061e565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b8610630565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610696565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566106a5565b34801561025a57600080fd5b50610156600160a060020a0360043516610704565b34801561027b57600080fd5b50610156600160a060020a03600435166108e4565b34801561029c57600080fd5b5061021d61091d565b3480156102b157600080fd5b50610156600160a060020a036004351661092c565b3480156102d257600080fd5b5061021d60ff600435166109a9565b3480156102ed57600080fd5b506102f66109c7565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a03600435166109dd565b34801561034957600080fd5b50610191600435610a00565b34801561036157600080fd5b5061021d610a12565b34801561037657600080fd5b506101b8610a21565b34801561038b57600080fd5b50610121600160a060020a0360043516610a84565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a038216600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252839160ff161515610531576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156104f65781810151838201526020016104de565b50505050905090810190601f1680156105235780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0383166000908152600460205260408120805460ff1916905591505b6005548210156106195760058054600160a060020a03851691908490811061057957fe5b600091825260209091200154600160a060020a0316141561060e576005805460001981019081106105a657fe5b60009182526020909120015460058054600160a060020a0390921691849081106105cc57fe5b60009182526020909120018054600160a060020a031916600160a060020a03929092169190911790556005805460001901906106089082610b12565b50610619565b600190910190610555565b505050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561068b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161066d575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146106bc57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461071c57600080fd5b600160a060020a038216600090815260066020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252839160ff161515610802576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104f65781810151838201526020016104de565b50600160a060020a0383166000908152600660205260408120805460ff1916905591505b6007548210156106195760078054600160a060020a03851691908490811061084a57fe5b600091825260209091200154600160a060020a031614156108d95760078054600019810190811061087757fe5b60009182526020909120015460078054600160a060020a03909216918490811061089d57fe5b60009182526020909120018054600160a060020a031916600160a060020a03929092169190911790556007805460001901906106089082610b12565b600190910190610826565b600054600160a060020a031633146108fb57600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461094357600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146109f457600080fd5b6109fd81610aa2565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561068b57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161066d575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a0381161515610ab757600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b8154818355818111156106195760008381526020902061061991810190830161069391905b80821115610b4b5760008155600101610b37565b50905600a165627a7a72305820fb8deddedc460fe95129dd12e57fc348fa080ea00608a01ca4713bb1d49b6e030029",
  "deployedBytecode": "0x6080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101355780631a1f2b3e146101585780631e912bd614610179578063559ed339146101a35780636e667db314610208578063715018a61461023957806377274ff01461024e57806385535cc51461026f5780638da5cb5b146102905780639f80ee88146102a5578063a003e069146102c6578063c19d93fb146102e1578063f2fde38b1461031c578063f7213db61461033d578063fbfa77cf14610355578063fe5b38e41461036a578063fef3ee731461037f575b600080fd5b34801561010c57600080fd5b50610121600160a060020a03600435166103a0565b604080519115158252519081900360200190f35b34801561014157600080fd5b50610156600160a060020a03600435166103be565b005b34801561016457600080fd5b50610156600160a060020a03600435166103f7565b34801561018557600080fd5b5061019160043561061e565b60408051918252519081900360200190f35b3480156101af57600080fd5b506101b8610630565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101f45781810151838201526020016101dc565b505050509050019250505060405180910390f35b34801561021457600080fd5b5061021d610696565b60408051600160a060020a039092168252519081900360200190f35b34801561024557600080fd5b506101566106a5565b34801561025a57600080fd5b50610156600160a060020a0360043516610704565b34801561027b57600080fd5b50610156600160a060020a03600435166108e4565b34801561029c57600080fd5b5061021d61091d565b3480156102b157600080fd5b50610156600160a060020a036004351661092c565b3480156102d257600080fd5b5061021d60ff600435166109a9565b3480156102ed57600080fd5b506102f66109c7565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561032857600080fd5b50610156600160a060020a03600435166109dd565b34801561034957600080fd5b50610191600435610a00565b34801561036157600080fd5b5061021d610a12565b34801561037657600080fd5b506101b8610a21565b34801561038b57600080fd5b50610121600160a060020a0360043516610a84565b600160a060020a031660009081526004602052604090205460ff1690565b600054600160a060020a031633146103d557600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60008054600160a060020a0316331461040f57600080fd5b600160a060020a038216600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252839160ff161515610531576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156104f65781810151838201526020016104de565b50505050905090810190601f1680156105235780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600160a060020a0383166000908152600460205260408120805460ff1916905591505b6005548210156106195760058054600160a060020a03851691908490811061057957fe5b600091825260209091200154600160a060020a0316141561060e576005805460001981019081106105a657fe5b60009182526020909120015460058054600160a060020a0390921691849081106105cc57fe5b60009182526020909120018054600160a060020a031916600160a060020a03929092169190911790556005805460001901906106089082610b12565b50610619565b600190910190610555565b505050565b60009081526009602052604090205490565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561068b57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161066d575b505050505090505b90565b600254600160a060020a031690565b600054600160a060020a031633146106bc57600080fd5b60008054604051600160a060020a03909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a260008054600160a060020a0319169055565b60008054600160a060020a0316331461071c57600080fd5b600160a060020a038216600090815260066020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252839160ff161515610802576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104f65781810151838201526020016104de565b50600160a060020a0383166000908152600660205260408120805460ff1916905591505b6007548210156106195760078054600160a060020a03851691908490811061084a57fe5b600091825260209091200154600160a060020a031614156108d95760078054600019810190811061087757fe5b60009182526020909120015460078054600160a060020a03909216918490811061089d57fe5b60009182526020909120018054600160a060020a031916600160a060020a03929092169190911790556007805460001901906106089082610b12565b600190910190610826565b600054600160a060020a031633146108fb57600080fd5b60038054600160a060020a031916600160a060020a0392909216919091179055565b600054600160a060020a031681565b600054600160a060020a0316331461094357600080fd5b600160a060020a03166000818152600460205260408120805460ff191660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a0319169091179055565b60ff16600090815260016020526040902054600160a060020a031690565b600254600354600160a060020a03918216911682565b600054600160a060020a031633146109f457600080fd5b6109fd81610aa2565b50565b60009081526008602052604090205490565b600354600160a060020a031690565b6060600160040180548060200260200160405190810160405280929190818152602001828054801561068b57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161066d575050505050905090565b600160a060020a031660009081526006602052604090205460ff1690565b600160a060020a0381161515610ab757600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a360008054600160a060020a031916600160a060020a0392909216919091179055565b8154818355818111156106195760008381526020902061061991810190830161069391905b80821115610b4b5760008155600101610b37565b50905600a165627a7a72305820fb8deddedc460fe95129dd12e57fc348fa080ea00608a01ca4713bb1d49b6e030029",
  "sourceMap": "989:2852:12:-;;;567:5:62;:18;;-1:-1:-1;;;;;;567:18:62;575:10;567:18;;;989:2852:12;;;;;;",
  "deployedSourceMap": "989:2852:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:24;-1:-1:-1;;;;;2803:164:24;;;;;;;;;;;;;;;;;;;;;;;1609:235:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1609:235:12;-1:-1:-1;;;;;1609:235:12;;;;;;;2525:578;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2525:578:12;-1:-1:-1;;;;;2525:578:12;;;;;4376:164:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4376:164:24;;;;;;;;;;;;;;;;;;;;;3685:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:24;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:24;;;;;;;;;;;;;;;;;2263:125;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:24;;;;;;;;-1:-1:-1;;;;;2263:125:24;;;;;;;;;;;;;;827:111:62;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:62;;;;3304:535:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3304:535:12;-1:-1:-1;;;;;3304:535:12;;;;;1253:195;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1253:195:12;-1:-1:-1;;;;;1253:195:12;;;;;238:20:62;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:62;;;;2043:273:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2043:273:12;-1:-1:-1;;;;;2043:273:12;;;;;1985:161:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:24;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:24;;;;;;;;-1:-1:-1;;;;;1710:18:24;;;;;;;;;;;;;;;;;;;;;;;;1100:103:62;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:62;-1:-1:-1;;;;;1100:103:62;;;;;4008:160:24;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4008:160:24;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:24;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:24;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:24;-1:-1:-1;;;;;3409:146:24;;;;;2803:164;-1:-1:-1;;;;;2930:30:24;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;1609:235:12:-;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;1801:19:12;:36;;-1:-1:-1;;;;;;1801:36:12;-1:-1:-1;;;;;1801:36:12;;;;;;;;;;1609:235::o;2525:578::-;2824:9;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1702:30:23;;;;;;:20;:30;;;;;;;;;;1746:15;;;;;;;;;;;;;;;;;;;;;;;;;;2639:8:12;;1702:30:23;;1681:90;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1681:90:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;;2714:30:12;;2747:5;2714:30;;;:20;:30;;;;;:38;;-1:-1:-1;;2714:38:12;;;2747:5;-1:-1:-1;2819:278:12;2843:15;:22;2839:26;;2819:278;;;2890:15;:18;;-1:-1:-1;;;;;2890:30:12;;;:15;2906:1;;2890:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;2890:18:12;:30;2886:201;;;2961:15;2977:22;;-1:-1:-1;;2977:26:12;;;2961:43;;;;;;;;;;;;;;;;2940:15;:18;;-1:-1:-1;;;;;2961:43:12;;;;2956:1;;2940:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;2940:64:12;-1:-1:-1;;;;;2940:64:12;;;;;;;;;;3022:15;:27;;-1:-1:-1;;3022:27:12;;;;;;:::i;:::-;;3067:5;;2886:201;2867:3;;;;;2819:278;;;731:1:62;2525:578:12;;:::o;4376:164:24:-;4476:4;4503:30;;;:18;:30;;;;;;;4376:164::o;3685:119::-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:24;;;;;;;;;;;;;;;;;;;;;;;3685:119;;:::o;2263:125::-;2362:19;;-1:-1:-1;;;;;2362:19:24;2263:125;:::o;827:111:62:-;719:5;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;903:5;;;884:25;;-1:-1:-1;;;;;903:5:62;;;;884:25;;;931:1;915:18;;-1:-1:-1;;;;;;915:18:62;;;827:111::o;3304:535:12:-;3564:9;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;1913:21:23;;;;;;:15;:21;;;;;;;;;;1948:11;;;;;;;;;;;;;;;;;;;;;;;;;;3406:4:12;;1913:21:23;;1892:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1892:77:23;-1:-1:-1;;;;;;3471:21:12;;3495:5;3471:21;;;:15;:21;;;;;:29;;-1:-1:-1;;3471:29:12;;;3495:5;-1:-1:-1;3559:274:12;3583:15;:22;3579:26;;3559:274;;;3630:15;:18;;-1:-1:-1;;;;;3630:26:12;;;:15;3646:1;;3630:18;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3630:18:12;:26;3626:197;;;3697:15;3713:22;;-1:-1:-1;;3713:26:12;;;3697:43;;;;;;;;;;;;;;;;3676:15;:18;;-1:-1:-1;;;;;3697:43:12;;;;3692:1;;3676:18;;;;;;;;;;;;;;;:64;;-1:-1:-1;;;;;;3676:64:12;-1:-1:-1;;;;;3676:64:12;;;;;;;;;;3758:15;:27;;-1:-1:-1;;3758:27:12;;;;;;:::i;3626:197::-;3607:3;;;;;3559:274;;1253:195;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;1421:11:12;:20;;-1:-1:-1;;;;;;1421:20:12;-1:-1:-1;;;;;1421:20:12;;;;;;;;;;1253:195::o;238:20:62:-;;;-1:-1:-1;;;;;238:20:62;;:::o;2043:273:12:-;719:5:62;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;-1:-1:-1;;;;;2197:30:12;;;;;:20;:30;;;;;:37;;-1:-1:-1;;2197:37:12;2230:4;2197:37;;;;;;2279:15;27:10:-1;;23:18;;;45:23;;2279:30:12;;;;;;;-1:-1:-1;;;;;;2279:30:12;;;;;;2043:273::o;1985:161:24:-;2111:28;;2081:7;2111:28;;;:5;:28;;;;;;-1:-1:-1;;;;;2111:28:24;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:24;;;;;;:::o;1100:103:62:-;719:5;;-1:-1:-1;;;;;719:5:62;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;4008:160:24:-;4106:4;4133:28;;;:16;:28;;;;;;;4008:160::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:24;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:24;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:24;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;1338:171:62:-;-1:-1:-1;;;;;1408:23:62;;;;1400:32;;;;;;1464:5;;;1443:38;;-1:-1:-1;;;;;1443:38:62;;;;1464:5;;;1443:38;;;1487:5;:17;;-1:-1:-1;;;;;;1487:17:62;-1:-1:-1;;;;;1487:17:62;;;;;;;;;;1338:171::o;989:2852:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state of variables that track\n * Core dependency addresses.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState,\n    CoreModifiers\n{\n    /* ============ External Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vault   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vault\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vault = _vault;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxy   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxy\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxy = _transferProxy;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories. Can only be set by\n     * owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n    {\n        // Mark as true in validFactories mapping\n        state.validFactories[_factory] = true;\n\n        // Add to factories array\n        state.factories.push(_factory);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories. Can only be disabled\n     * by owner of Core.\n     *\n     * @param  _factory   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factory\n    )\n        external\n        onlyOwner\n        isValidFactory(_factory)\n    {\n        // Mark as false in validFactories mapping\n        state.validFactories[_factory] = false;\n\n        // Find and remove factory from factories array\n        for (uint256 i = 0; i < state.factories.length; i++) {\n            if (state.factories[i] == _factory) {\n                state.factories[i] = state.factories[state.factories.length - 1];\n                state.factories.length -= 1;\n                break;\n            }\n        }\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens. Can only\n     * be disables by owner of Core.\n     *\n     * @param  _set   The address of the SetToken to disable\n     */\n    function disableSet(\n        address _set\n    )\n        external\n        onlyOwner\n        isValidSet(_set)\n    {\n        // Mark as false in validSet mapping\n        state.validSets[_set] = false;\n\n        // Find and remove from setTokens array\n        for (uint256 i = 0; i < state.setTokens.length; i++) {\n            if (state.setTokens[i] == _set) {\n                state.setTokens[i] = state.setTokens[state.setTokens.length - 1];\n                state.setTokens.length -= 1;\n                break;\n            }\n        }\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2023
      ]
    },
    "id": 2024,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1828,
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
        "id": 1830,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 6789,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1829,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1832,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 3686,
        "src": "699:63:12",
        "symbolAliases": [
          {
            "foreign": 1831,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1834,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 3825,
        "src": "763:49:12",
        "symbolAliases": [
          {
            "foreign": 1833,
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
              "id": 1835,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6788,
              "src": "1018:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6788",
                "typeString": "contract Ownable"
              }
            },
            "id": 1836,
            "nodeType": "InheritanceSpecifier",
            "src": "1018:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1837,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3824,
              "src": "1031:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3824",
                "typeString": "contract CoreState"
              }
            },
            "id": 1838,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:9:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1839,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3685,
              "src": "1046:13:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3685",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1840,
            "nodeType": "InheritanceSpecifier",
            "src": "1046:13:12"
          }
        ],
        "contractDependencies": [
          3685,
          3824,
          6788
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2023,
        "linearizedBaseContracts": [
          2023,
          3685,
          3824,
          6788
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1853,
              "nodeType": "Block",
              "src": "1347:101:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1851,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1847,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3720,
                        "src": "1421:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3718_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1849,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3695,
                      "src": "1421:11:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1850,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1842,
                      "src": "1435:6:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1421:20:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1852,
                  "nodeType": "ExpressionStatement",
                  "src": "1421:20:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 1854,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1845,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1844,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "1333:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1333:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1843,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1842,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 1854,
                  "src": "1287:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1841,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1277:30:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1846,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1347:0:12"
            },
            "scope": 2023,
            "src": "1253:195:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1867,
              "nodeType": "Block",
              "src": "1719:125:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1865,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1861,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3720,
                        "src": "1801:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3718_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1863,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3693,
                      "src": "1801:19:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1864,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1856,
                      "src": "1823:14:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1801:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1866,
                  "nodeType": "ExpressionStatement",
                  "src": "1801:36:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 1868,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1859,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1858,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "1705:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1705:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1857,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1856,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1868,
                  "src": "1651:22:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1855,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1651:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1641:38:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1860,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1719:0:12"
            },
            "scope": 2023,
            "src": "1609:235:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1891,
              "nodeType": "Block",
              "src": "2137:179:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1881,
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
                          "id": 1875,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2197:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
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
                        "referencedDeclaration": 3699,
                        "src": "2197:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1879,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1877,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1870,
                        "src": "2218:8:12",
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
                      "src": "2197:30:12",
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
                      "id": 1880,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2230:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2197:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1882,
                  "nodeType": "ExpressionStatement",
                  "src": "2197:37:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1888,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1870,
                        "src": "2300:8:12",
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
                          "id": 1883,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2279:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1886,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3702,
                        "src": "2279:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1887,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2279:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1889,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2279:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1890,
                  "nodeType": "ExpressionStatement",
                  "src": "2279:30:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1892,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1873,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1872,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2123:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2123:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1870,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1892,
                  "src": "2075:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1869,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2075:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2065:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1874,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2137:0:12"
            },
            "scope": 2023,
            "src": "2043:273:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1956,
              "nodeType": "Block",
              "src": "2653:450:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1908,
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
                          "id": 1902,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2714:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1905,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3699,
                        "src": "2714:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1906,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1904,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1894,
                        "src": "2735:8:12",
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
                      "src": "2714:30:12",
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
                      "id": 1907,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2747:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2714:38:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1909,
                  "nodeType": "ExpressionStatement",
                  "src": "2714:38:12"
                },
                {
                  "body": {
                    "id": 1954,
                    "nodeType": "Block",
                    "src": "2872:225:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1927,
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
                                "id": 1922,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3720,
                                "src": "2890:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3718_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1923,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3702,
                              "src": "2890:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1925,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1924,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1911,
                              "src": "2906:1:12",
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
                            "src": "2890:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1926,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1894,
                            "src": "2912:8:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2890:30:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1953,
                        "nodeType": "IfStatement",
                        "src": "2886:201:12",
                        "trueBody": {
                          "id": 1952,
                          "nodeType": "Block",
                          "src": "2922:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1941,
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
                                      "id": 1928,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "2940:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1931,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "2940:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1932,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1930,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1911,
                                    "src": "2956:1:12",
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
                                  "src": "2940:18:12",
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
                                      "id": 1933,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "2961:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1934,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "2961:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1940,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1939,
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
                                          "id": 1935,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3720,
                                          "src": "2977:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3718_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1936,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3702,
                                        "src": "2977:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1937,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2977:22:12",
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
                                      "id": 1938,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3002:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2977:26:12",
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
                                  "src": "2961:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2940:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1942,
                              "nodeType": "ExpressionStatement",
                              "src": "2940:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1949,
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
                                      "id": 1943,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3022:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1946,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "3022:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1947,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3022:22:12",
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
                                  "id": 1948,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3048:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3022:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1950,
                              "nodeType": "ExpressionStatement",
                              "src": "3022:27:12"
                            },
                            {
                              "id": 1951,
                              "nodeType": "Break",
                              "src": "3067:5:12"
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
                    "id": 1918,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1914,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1911,
                      "src": "2839:1:12",
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
                          "id": 1915,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2843:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1916,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3702,
                        "src": "2843:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1917,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2843:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2839:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1955,
                  "initializationExpression": {
                    "assignments": [
                      1911
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1911,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1957,
                        "src": "2824:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1910,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2824:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1913,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1912,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2836:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2824:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1920,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2867:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1919,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1911,
                        "src": "2867:1:12",
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
                    "id": 1921,
                    "nodeType": "ExpressionStatement",
                    "src": "2867:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2819:278:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1957,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1897,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1896,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2606:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2606:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1899,
                    "name": "_factory",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1894,
                    "src": "2639:8:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1900,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1898,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3649,
                  "src": "2624:14:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2624:24:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1895,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1894,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1957,
                  "src": "2558:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1893,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2558:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2548:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1901,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2653:0:12"
            },
            "scope": 2023,
            "src": "2525:578:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2021,
              "nodeType": "Block",
              "src": "3416:423:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1973,
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
                          "id": 1967,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "3471:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1970,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3706,
                        "src": "3471:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1971,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1969,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1959,
                        "src": "3487:4:12",
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
                      "src": "3471:21:12",
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
                      "id": 1972,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3495:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3471:29:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1974,
                  "nodeType": "ExpressionStatement",
                  "src": "3471:29:12"
                },
                {
                  "body": {
                    "id": 2019,
                    "nodeType": "Block",
                    "src": "3612:221:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1992,
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
                                "id": 1987,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3720,
                                "src": "3630:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3718_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1988,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3709,
                              "src": "3630:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1990,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1989,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1976,
                              "src": "3646:1:12",
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
                            "src": "3630:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1991,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1959,
                            "src": "3652:4:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3630:26:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 2018,
                        "nodeType": "IfStatement",
                        "src": "3626:197:12",
                        "trueBody": {
                          "id": 2017,
                          "nodeType": "Block",
                          "src": "3658:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 2006,
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
                                      "id": 1993,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3676:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
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
                                    "referencedDeclaration": 3709,
                                    "src": "3676:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1997,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1995,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1976,
                                    "src": "3692:1:12",
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
                                  "src": "3676:18:12",
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
                                      "id": 1998,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3697:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1999,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3709,
                                    "src": "3697:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 2005,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 2004,
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
                                          "id": 2000,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3720,
                                          "src": "3713:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3718_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 2001,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3709,
                                        "src": "3713:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 2002,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3713:22:12",
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
                                      "id": 2003,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3738:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3713:26:12",
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
                                  "src": "3697:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3676:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 2007,
                              "nodeType": "ExpressionStatement",
                              "src": "3676:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 2014,
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
                                      "id": 2008,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3758:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 2011,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3709,
                                    "src": "3758:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 2012,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3758:22:12",
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
                                  "id": 2013,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3784:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3758:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2015,
                              "nodeType": "ExpressionStatement",
                              "src": "3758:27:12"
                            },
                            {
                              "id": 2016,
                              "nodeType": "Break",
                              "src": "3803:5:12"
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
                    "id": 1983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1979,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1976,
                      "src": "3579:1:12",
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
                          "id": 1980,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "3583:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
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
                        "referencedDeclaration": 3709,
                        "src": "3583:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1982,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3583:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3579:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2020,
                  "initializationExpression": {
                    "assignments": [
                      1976
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1976,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 2022,
                        "src": "3564:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1975,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3564:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1978,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1977,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3576:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3564:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1985,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3607:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1984,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1976,
                        "src": "3607:1:12",
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
                    "id": 1986,
                    "nodeType": "ExpressionStatement",
                    "src": "3607:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3559:274:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2022,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1962,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1961,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "3377:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3377:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1964,
                    "name": "_set",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1959,
                    "src": "3406:4:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1965,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1963,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3663,
                  "src": "3395:10:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3395:16:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1960,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1959,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2022,
                  "src": "3333:12:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1958,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3333:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3323:28:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1966,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3416:0:12"
            },
            "scope": 2023,
            "src": "3304:535:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2024,
        "src": "989:2852:12"
      }
    ],
    "src": "597:3245:12"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        2023
      ]
    },
    "id": 2024,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1828,
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
        "id": 1830,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 6789,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1829,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1832,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 3686,
        "src": "699:63:12",
        "symbolAliases": [
          {
            "foreign": 1831,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1834,
        "nodeType": "ImportDirective",
        "scope": 2024,
        "sourceUnit": 3825,
        "src": "763:49:12",
        "symbolAliases": [
          {
            "foreign": 1833,
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
              "id": 1835,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6788,
              "src": "1018:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6788",
                "typeString": "contract Ownable"
              }
            },
            "id": 1836,
            "nodeType": "InheritanceSpecifier",
            "src": "1018:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1837,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3824,
              "src": "1031:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3824",
                "typeString": "contract CoreState"
              }
            },
            "id": 1838,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:9:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1839,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3685,
              "src": "1046:13:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3685",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1840,
            "nodeType": "InheritanceSpecifier",
            "src": "1046:13:12"
          }
        ],
        "contractDependencies": [
          3685,
          3824,
          6788
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state of variables that track\nCore dependency addresses.",
        "fullyImplemented": true,
        "id": 2023,
        "linearizedBaseContracts": [
          2023,
          3685,
          3824,
          6788
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1853,
              "nodeType": "Block",
              "src": "1347:101:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1851,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1847,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3720,
                        "src": "1421:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3718_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1849,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3695,
                      "src": "1421:11:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1850,
                      "name": "_vault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1842,
                      "src": "1435:6:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1421:20:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1852,
                  "nodeType": "ExpressionStatement",
                  "src": "1421:20:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vault   The address of the Vault",
            "id": 1854,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1845,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1844,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "1333:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1333:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1843,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1842,
                  "name": "_vault",
                  "nodeType": "VariableDeclaration",
                  "scope": 1854,
                  "src": "1287:14:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1841,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1287:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1277:30:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1846,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1347:0:12"
            },
            "scope": 2023,
            "src": "1253:195:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1867,
              "nodeType": "Block",
              "src": "1719:125:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1865,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1861,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3720,
                        "src": "1801:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3718_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1863,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxy",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3693,
                      "src": "1801:19:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1864,
                      "name": "_transferProxy",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1856,
                      "src": "1823:14:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1801:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1866,
                  "nodeType": "ExpressionStatement",
                  "src": "1801:36:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxy   The address of the TransferProxy",
            "id": 1868,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1859,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1858,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "1705:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1705:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1857,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1856,
                  "name": "_transferProxy",
                  "nodeType": "VariableDeclaration",
                  "scope": 1868,
                  "src": "1651:22:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1855,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1651:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1641:38:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1860,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1719:0:12"
            },
            "scope": 2023,
            "src": "1609:235:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1891,
              "nodeType": "Block",
              "src": "2137:179:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1881,
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
                          "id": 1875,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2197:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
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
                        "referencedDeclaration": 3699,
                        "src": "2197:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1879,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1877,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1870,
                        "src": "2218:8:12",
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
                      "src": "2197:30:12",
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
                      "id": 1880,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2230:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2197:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1882,
                  "nodeType": "ExpressionStatement",
                  "src": "2197:37:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1888,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1870,
                        "src": "2300:8:12",
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
                          "id": 1883,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2279:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1886,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3702,
                        "src": "2279:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1887,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2279:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1889,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2279:30:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1890,
                  "nodeType": "ExpressionStatement",
                  "src": "2279:30:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories. Can only be set by\nowner of Core.\n     * @param  _factory   The address of the SetTokenFactory to enable",
            "id": 1892,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1873,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1872,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2123:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2123:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1871,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1870,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1892,
                  "src": "2075:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1869,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2075:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2065:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1874,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2137:0:12"
            },
            "scope": 2023,
            "src": "2043:273:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1956,
              "nodeType": "Block",
              "src": "2653:450:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1908,
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
                          "id": 1902,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2714:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1905,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3699,
                        "src": "2714:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1906,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1904,
                        "name": "_factory",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1894,
                        "src": "2735:8:12",
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
                      "src": "2714:30:12",
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
                      "id": 1907,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2747:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2714:38:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1909,
                  "nodeType": "ExpressionStatement",
                  "src": "2714:38:12"
                },
                {
                  "body": {
                    "id": 1954,
                    "nodeType": "Block",
                    "src": "2872:225:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1927,
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
                                "id": 1922,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3720,
                                "src": "2890:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3718_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1923,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3702,
                              "src": "2890:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1925,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1924,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1911,
                              "src": "2906:1:12",
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
                            "src": "2890:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1926,
                            "name": "_factory",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1894,
                            "src": "2912:8:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2890:30:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1953,
                        "nodeType": "IfStatement",
                        "src": "2886:201:12",
                        "trueBody": {
                          "id": 1952,
                          "nodeType": "Block",
                          "src": "2922:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1941,
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
                                      "id": 1928,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "2940:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1931,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "2940:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1932,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1930,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1911,
                                    "src": "2956:1:12",
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
                                  "src": "2940:18:12",
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
                                      "id": 1933,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "2961:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1934,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "2961:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1940,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1939,
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
                                          "id": 1935,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3720,
                                          "src": "2977:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3718_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1936,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3702,
                                        "src": "2977:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1937,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2977:22:12",
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
                                      "id": 1938,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3002:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2977:26:12",
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
                                  "src": "2961:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2940:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1942,
                              "nodeType": "ExpressionStatement",
                              "src": "2940:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1949,
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
                                      "id": 1943,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3022:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1946,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3702,
                                    "src": "3022:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1947,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3022:22:12",
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
                                  "id": 1948,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3048:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3022:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1950,
                              "nodeType": "ExpressionStatement",
                              "src": "3022:27:12"
                            },
                            {
                              "id": 1951,
                              "nodeType": "Break",
                              "src": "3067:5:12"
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
                    "id": 1918,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1914,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1911,
                      "src": "2839:1:12",
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
                          "id": 1915,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "2843:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1916,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3702,
                        "src": "2843:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1917,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2843:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2839:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1955,
                  "initializationExpression": {
                    "assignments": [
                      1911
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1911,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1957,
                        "src": "2824:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1910,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2824:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1913,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1912,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2836:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2824:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1920,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2867:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1919,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1911,
                        "src": "2867:1:12",
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
                    "id": 1921,
                    "nodeType": "ExpressionStatement",
                    "src": "2867:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2819:278:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories. Can only be disabled\nby owner of Core.\n     * @param  _factory   The address of the SetTokenFactory to disable",
            "id": 1957,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1897,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1896,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "2606:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2606:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1899,
                    "name": "_factory",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1894,
                    "src": "2639:8:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1900,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1898,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3649,
                  "src": "2624:14:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2624:24:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1895,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1894,
                  "name": "_factory",
                  "nodeType": "VariableDeclaration",
                  "scope": 1957,
                  "src": "2558:16:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1893,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2558:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2548:32:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1901,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2653:0:12"
            },
            "scope": 2023,
            "src": "2525:578:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 2021,
              "nodeType": "Block",
              "src": "3416:423:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1973,
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
                          "id": 1967,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "3471:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1970,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3706,
                        "src": "3471:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1971,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1969,
                        "name": "_set",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1959,
                        "src": "3487:4:12",
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
                      "src": "3471:21:12",
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
                      "id": 1972,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3495:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3471:29:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1974,
                  "nodeType": "ExpressionStatement",
                  "src": "3471:29:12"
                },
                {
                  "body": {
                    "id": 2019,
                    "nodeType": "Block",
                    "src": "3612:221:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1992,
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
                                "id": 1987,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3720,
                                "src": "3630:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3718_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1988,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3709,
                              "src": "3630:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1990,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1989,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1976,
                              "src": "3646:1:12",
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
                            "src": "3630:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1991,
                            "name": "_set",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1959,
                            "src": "3652:4:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3630:26:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 2018,
                        "nodeType": "IfStatement",
                        "src": "3626:197:12",
                        "trueBody": {
                          "id": 2017,
                          "nodeType": "Block",
                          "src": "3658:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 2006,
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
                                      "id": 1993,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3676:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
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
                                    "referencedDeclaration": 3709,
                                    "src": "3676:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1997,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1995,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1976,
                                    "src": "3692:1:12",
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
                                  "src": "3676:18:12",
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
                                      "id": 1998,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3697:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1999,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3709,
                                    "src": "3697:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 2005,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 2004,
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
                                          "id": 2000,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3720,
                                          "src": "3713:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3718_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 2001,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3709,
                                        "src": "3713:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 2002,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3713:22:12",
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
                                      "id": 2003,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3738:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3713:26:12",
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
                                  "src": "3697:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3676:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 2007,
                              "nodeType": "ExpressionStatement",
                              "src": "3676:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 2014,
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
                                      "id": 2008,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3720,
                                      "src": "3758:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3718_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 2011,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3709,
                                    "src": "3758:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 2012,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3758:22:12",
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
                                  "id": 2013,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3784:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3758:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 2015,
                              "nodeType": "ExpressionStatement",
                              "src": "3758:27:12"
                            },
                            {
                              "id": 2016,
                              "nodeType": "Break",
                              "src": "3803:5:12"
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
                    "id": 1983,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1979,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1976,
                      "src": "3579:1:12",
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
                          "id": 1980,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3720,
                          "src": "3583:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3718_storage",
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
                        "referencedDeclaration": 3709,
                        "src": "3583:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1982,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3583:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3579:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 2020,
                  "initializationExpression": {
                    "assignments": [
                      1976
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1976,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 2022,
                        "src": "3564:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1975,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3564:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1978,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1977,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3576:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3564:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1985,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3607:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1984,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1976,
                        "src": "3607:1:12",
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
                    "id": 1986,
                    "nodeType": "ExpressionStatement",
                    "src": "3607:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3559:274:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens. Can only\nbe disables by owner of Core.\n     * @param  _set   The address of the SetToken to disable",
            "id": 2022,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1962,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1961,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6736,
                  "src": "3377:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3377:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1964,
                    "name": "_set",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1959,
                    "src": "3406:4:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1965,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1963,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3663,
                  "src": "3395:10:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3395:16:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1960,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1959,
                  "name": "_set",
                  "nodeType": "VariableDeclaration",
                  "scope": 2022,
                  "src": "3333:12:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1958,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3333:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3323:28:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1966,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3416:0:12"
            },
            "scope": 2023,
            "src": "3304:535:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 2024,
        "src": "989:2852:12"
      }
    ],
    "src": "597:3245:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-27T04:20:39.809Z"
}