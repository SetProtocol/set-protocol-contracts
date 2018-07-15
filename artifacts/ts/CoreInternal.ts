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
      "name": "vaultAddress",
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
      "name": "transferProxyAddress",
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
          "name": "transferProxyAddress",
          "type": "address"
        },
        {
          "name": "vaultAddress",
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
          "name": "_vaultAddress",
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
          "name": "_transferProxyAddress",
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
          "name": "_factoryAddress",
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
          "name": "_factoryAddress",
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
          "name": "_setAddress",
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
  "bytecode": "0x608060405260008054600160a060020a03191633179055610f3e806100256000396000f3006080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101425780631a1f2b3e146101725780631e912bd6146101a0578063430bf08a146101ca578063559ed33914610208578063715018a61461026d57806377274ff01461028257806385535cc5146102b05780638ca4daf9146102de5780638da5cb5b146102f35780639f80ee8814610308578063a003e06914610336578063c19d93fb14610351578063f2fde38b14610399578063f7213db6146103c7578063fe5b38e4146103df578063fef3ee73146103f4575b600080fd5b34801561010c57600080fd5b5061012e73ffffffffffffffffffffffffffffffffffffffff60043516610422565b604080519115158252519081900360200190f35b34801561014e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff6004351661044d565b005b34801561017e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff600435166104b8565b3480156101ac57600080fd5b506101b86004356107ac565b60408051918252519081900360200190f35b3480156101d657600080fd5b506101df6107be565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561021457600080fd5b5061021d6107db565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610259578181015183820152602001610241565b505050509050019250505060405180910390f35b34801561027957600080fd5b5061017061084d565b34801561028e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff600435166108de565b3480156102bc57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610b8b565b3480156102ea57600080fd5b506101df610bf6565b3480156102ff57600080fd5b506101df610c12565b34801561031457600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610c2e565b34801561034257600080fd5b506101df60ff60043516610cfb565b34801561035d57600080fd5b50610366610d26565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156103a557600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610d49565b3480156103d357600080fd5b506101b8600435610d79565b3480156103eb57600080fd5b5061021d610d8b565b34801561040057600080fd5b5061012e73ffffffffffffffffffffffffffffffffffffffff60043516610dfb565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205460ff1690565b60005473ffffffffffffffffffffffffffffffffffffffff16331461047157600080fd5b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000805473ffffffffffffffffffffffffffffffffffffffff1633146104dd57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252839160ff16151561060c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156105d15781810151838201526020016105b9565b50505050905090810190601f1680156105fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8316600090815260046020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905591505b6005548210156107a7576005805473ffffffffffffffffffffffffffffffffffffffff851691908490811061068c57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16141561079c57600580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81019081106106e457fe5b6000918252602090912001546005805473ffffffffffffffffffffffffffffffffffffffff909216918490811061071757fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107969082610ed5565b506107a7565b60019091019061065b565b505050565b60009081526009602052604090205490565b60035473ffffffffffffffffffffffffffffffffffffffff165b90565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561084357602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610818575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff16331461087157600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b6000805473ffffffffffffffffffffffffffffffffffffffff16331461090357600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260066020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252839160ff1615156109f6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156105d15781810151838201526020016105b9565b5073ffffffffffffffffffffffffffffffffffffffff8316600090815260066020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905591505b6007548210156107a7576007805473ffffffffffffffffffffffffffffffffffffffff8516919084908110610a7657fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff161415610b8057600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610ace57fe5b6000918252602090912001546007805473ffffffffffffffffffffffffffffffffffffffff9092169184908110610b0157fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107969082610ed5565b600190910190610a45565b60005473ffffffffffffffffffffffffffffffffffffffff163314610baf57600080fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c5257600080fd5b73ffffffffffffffffffffffffffffffffffffffff16600081815260046020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b60ff1660009081526001602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60025460035473ffffffffffffffffffffffffffffffffffffffff918216911682565b60005473ffffffffffffffffffffffffffffffffffffffff163314610d6d57600080fd5b610d7681610e26565b50565b60009081526008602052604090205490565b606060016004018054806020026020016040519081016040528092919081815260200182805480156108435760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610818575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205460ff1690565b73ffffffffffffffffffffffffffffffffffffffff81161515610e4857600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b8154818355818111156107a7576000838152602090206107a79181019083016107d891905b80821115610f0e5760008155600101610efa565b50905600a165627a7a7230582039f461eddb832ef7ea9085a195a77540ae4c1c040b54909716fff07920972acd0029",
  "deployedBytecode": "0x6080604052600436106100fb5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d48114610100578063124cfd78146101425780631a1f2b3e146101725780631e912bd6146101a0578063430bf08a146101ca578063559ed33914610208578063715018a61461026d57806377274ff01461028257806385535cc5146102b05780638ca4daf9146102de5780638da5cb5b146102f35780639f80ee8814610308578063a003e06914610336578063c19d93fb14610351578063f2fde38b14610399578063f7213db6146103c7578063fe5b38e4146103df578063fef3ee73146103f4575b600080fd5b34801561010c57600080fd5b5061012e73ffffffffffffffffffffffffffffffffffffffff60043516610422565b604080519115158252519081900360200190f35b34801561014e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff6004351661044d565b005b34801561017e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff600435166104b8565b3480156101ac57600080fd5b506101b86004356107ac565b60408051918252519081900360200190f35b3480156101d657600080fd5b506101df6107be565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561021457600080fd5b5061021d6107db565b60408051602080825283518183015283519192839290830191858101910280838360005b83811015610259578181015183820152602001610241565b505050509050019250505060405180910390f35b34801561027957600080fd5b5061017061084d565b34801561028e57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff600435166108de565b3480156102bc57600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610b8b565b3480156102ea57600080fd5b506101df610bf6565b3480156102ff57600080fd5b506101df610c12565b34801561031457600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610c2e565b34801561034257600080fd5b506101df60ff60043516610cfb565b34801561035d57600080fd5b50610366610d26565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156103a557600080fd5b5061017073ffffffffffffffffffffffffffffffffffffffff60043516610d49565b3480156103d357600080fd5b506101b8600435610d79565b3480156103eb57600080fd5b5061021d610d8b565b34801561040057600080fd5b5061012e73ffffffffffffffffffffffffffffffffffffffff60043516610dfb565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205460ff1690565b60005473ffffffffffffffffffffffffffffffffffffffff16331461047157600080fd5b600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000805473ffffffffffffffffffffffffffffffffffffffff1633146104dd57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260046020908152604091829020548251606081018452602681527f466163746f72792069732064697361626c6564206f7220646f6573206e6f7420928101929092527f65786973742e000000000000000000000000000000000000000000000000000092820192909252839160ff16151561060c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156105d15781810151838201526020016105b9565b50505050905090810190601f1680156105fe5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8316600090815260046020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905591505b6005548210156107a7576005805473ffffffffffffffffffffffffffffffffffffffff851691908490811061068c57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16141561079c57600580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81019081106106e457fe5b6000918252602090912001546005805473ffffffffffffffffffffffffffffffffffffffff909216918490811061071757fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107969082610ed5565b506107a7565b60019091019061065b565b505050565b60009081526009602052604090205490565b60035473ffffffffffffffffffffffffffffffffffffffff165b90565b6060600160060180548060200260200160405190810160405280929190818152602001828054801561084357602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610818575b5050505050905090565b60005473ffffffffffffffffffffffffffffffffffffffff16331461087157600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b6000805473ffffffffffffffffffffffffffffffffffffffff16331461090357600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260066020908152604091829020548251606081018452602881527f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f928101929092527f742065786973742e00000000000000000000000000000000000000000000000092820192909252839160ff1615156109f6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156105d15781810151838201526020016105b9565b5073ffffffffffffffffffffffffffffffffffffffff8316600090815260066020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905591505b6007548210156107a7576007805473ffffffffffffffffffffffffffffffffffffffff8516919084908110610a7657fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff161415610b8057600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610ace57fe5b6000918252602090912001546007805473ffffffffffffffffffffffffffffffffffffffff9092169184908110610b0157fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600780547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107969082610ed5565b600190910190610a45565b60005473ffffffffffffffffffffffffffffffffffffffff163314610baf57600080fd5b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c5257600080fd5b73ffffffffffffffffffffffffffffffffffffffff16600081815260046020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660019081179091556005805491820181559091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169091179055565b60ff1660009081526001602052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60025460035473ffffffffffffffffffffffffffffffffffffffff918216911682565b60005473ffffffffffffffffffffffffffffffffffffffff163314610d6d57600080fd5b610d7681610e26565b50565b60009081526008602052604090205490565b606060016004018054806020026020016040519081016040528092919081815260200182805480156108435760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610818575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526006602052604090205460ff1690565b73ffffffffffffffffffffffffffffffffffffffff81161515610e4857600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b8154818355818111156107a7576000838152602090206107a79181019083016107d891905b80821115610f0e5760008155600101610efa565b50905600a165627a7a7230582039f461eddb832ef7ea9085a195a77540ae4c1c040b54909716fff07920972acd0029",
  "sourceMap": "1002:2583:12:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;1002:2583:12;;;;;;",
  "deployedSourceMap": "1002:2583:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;1655:256:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1655:256:12;;;;;;;;;2455:498;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2455:498:12;;;;;;;2924:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;2099:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;2647:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;827:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;3114:469:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3114:469:12;;;;;;;1271:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1271:216:12;;;;;;;1954:139:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;238:20:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;2076:209:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2076:209:12;;;;;;;1801:147:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;;;;;;;2772:146:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;1655:256:12:-;719:5:61;;;;705:10;:19;697:28;;;;;;1854:26:12;:50;;;;;;;;;;;;;;;1655:256::o;2455:498::-;2667:9;719:5:61;;;;705:10;:19;697:28;;;;;;1709:37:22;;;;;;;:20;:37;;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;;;;2576::12;;1709:37:22;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1688:97:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2607:37:12;;;2647:5;2607:37;;;:20;:37;;;;;:45;;;;;;2647:5;-1:-1:-1;2662:285:12;2686:15;:22;2682:26;;2662:285;;;2733:15;:18;;:37;;;;:15;2749:1;;2733:18;;;;;;;;;;;;;;;;;;:37;2729:208;;;2811:15;2827:22;;:26;;;;2811:43;;;;;;;;;;;;;;;;2790:15;:18;;2811:43;;;;;2806:1;;2790:18;;;;;;;;;;;;;;;:64;;;;;;;;;;;;;;;2872:15;:27;;;;;;;;;:::i;:::-;;2917:5;;2729:208;2710:3;;;;;2662:285;;;731:1:61;2455:498:12;;:::o;2924:150:23:-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;2099:123::-;2197:18;;;;2099:123;;:::o;2647:119::-;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;827:111:61:-;719:5;;;;705:10;:19;697:28;;;;;;903:5;;;884:25;;903:5;;;;;884:25;;;931:1;915:18;;;;;;827:111::o;3114:469:12:-;3301:9;719:5:61;;;;705:10;:19;697:28;;;;;;1934::22;;;;;;;:15;:28;;;;;;;;;;1976:11;;;;;;;;;;;;;;;;;;;;;;;;;;3223::12;;1934:28:22;;1913:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1913:84:22;-1:-1:-1;3250:28:12;;;3281:5;3250:28;;;:15;:28;;;;;:36;;;;;;3281:5;-1:-1:-1;3296:281:12;3320:15;:22;3316:26;;3296:281;;;3367:15;:18;;:33;;;;:15;3383:1;;3367:18;;;;;;;;;;;;;;;;;;:33;3363:204;;;3441:15;3457:22;;:26;;;;3441:43;;;;;;;;;;;;;;;;3420:15;:18;;3441:43;;;;;3436:1;;3420:18;;;;;;;;;;;;;;;:64;;;;;;;;;;;;;;;3502:15;:27;;;;;;;;;:::i;3363:204::-;3344:3;;;;;3296:281;;1271:216;719:5:61;;;;705:10;:19;697:28;;;;;;1446:18:12;:34;;;;;;;;;;;;;;;1271:216::o;1954:139:23:-;2060:26;;;;1954:139;:::o;238:20:61:-;;;;;;:::o;2076:209:12:-;719:5:61;;;;705:10;:19;697:28;;;;;;2187:37:12;;;;;;:20;:37;;;;;:44;;;;2227:4;2187:44;;;;;;2241:15;27:10:-1;;23:18;;;45:23;;2241:37:12;;;;;;;;;;;;;;2076:209::o;1801:147:23:-;1913:28;;1883:7;1913:28;;;:5;:28;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;1100:103:61:-;719:5;;;;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;2772:146:23:-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o;1338:171:61:-;1408:23;;;;;1400:32;;;;;;1464:5;;;1443:38;;;;;;;1464:5;;;1443:38;;;1487:5;:17;;;;;;;;;;;;;;;1338:171::o;1002:2583:12:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state that tracks contract\n * addresses that need to interact with Core.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState,\n    CoreModifiers\n{\n    /* ============ Setter Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vaultAddress   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vaultAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vaultAddress = _vaultAddress;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxyAddress   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxyAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxyAddress = _transferProxyAddress;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n    {\n        state.validFactories[_factoryAddress] = true;\n        state.factories.push(_factoryAddress);\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n        isValidFactory(_factoryAddress)\n    {\n        state.validFactories[_factoryAddress] = false;\n        for (uint256 i = 0; i < state.factories.length; i++) {\n            if (state.factories[i] == _factoryAddress) {\n                state.factories[i] = state.factories[state.factories.length - 1];\n                state.factories.length -= 1;\n                break;\n            }\n        }\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _setAddress   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _setAddress\n    )\n        external\n        onlyOwner\n        isValidSet(_setAddress)\n    {\n        state.validSets[_setAddress] = false;\n        for (uint256 i = 0; i < state.setTokens.length; i++) {\n            if (state.setTokens[i] == _setAddress) {\n                state.setTokens[i] = state.setTokens[state.setTokens.length - 1];\n                state.setTokens.length -= 1;\n                break;\n            }\n        }\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1948
      ]
    },
    "id": 1949,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1753,
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
        "id": 1755,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 6433,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1754,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1757,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 3455,
        "src": "699:63:12",
        "symbolAliases": [
          {
            "foreign": 1756,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1759,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 3594,
        "src": "763:49:12",
        "symbolAliases": [
          {
            "foreign": 1758,
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
              "id": 1760,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "1031:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 1761,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1762,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1044:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1763,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1764,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1059:13:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1765,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:12"
          }
        ],
        "contractDependencies": [
          3454,
          3593,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1948,
        "linearizedBaseContracts": [
          1948,
          3454,
          3593,
          6432
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1778,
              "nodeType": "Block",
              "src": "1372:115:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1776,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1772,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1446:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1774,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3464,
                      "src": "1446:18:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1775,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1767,
                      "src": "1467:13:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1777,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1779,
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
                  "referencedDeclaration": 6380,
                  "src": "1358:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1768,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1767,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1779,
                  "src": "1305:21:12",
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
                    "src": "1305:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1771,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:12"
            },
            "scope": 1948,
            "src": "1271:216:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1792,
              "nodeType": "Block",
              "src": "1772:139:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1790,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1786,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1854:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1788,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3462,
                      "src": "1854:26:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1789,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1781,
                      "src": "1883:21:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1791,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1793,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1784,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1783,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1758:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1781,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1793,
                  "src": "1697:29:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1780,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1785,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:12"
            },
            "scope": 1948,
            "src": "1655:256:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1816,
              "nodeType": "Block",
              "src": "2177:108:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1806,
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
                          "id": 1800,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2187:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1803,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3468,
                        "src": "2187:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1804,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1802,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1795,
                        "src": "2208:15:12",
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
                      "src": "2187:37:12",
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
                      "id": 1805,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1807,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1813,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1795,
                        "src": "2262:15:12",
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
                          "id": 1808,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2241:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1811,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3471,
                        "src": "2241:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1812,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2241:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2241:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1815,
                  "nodeType": "ExpressionStatement",
                  "src": "2241:37:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1817,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1798,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1797,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "2163:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1796,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1795,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1817,
                  "src": "2108:23:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1794,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1799,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:12"
            },
            "scope": 1948,
            "src": "2076:209:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1881,
              "nodeType": "Block",
              "src": "2597:356:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1833,
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
                          "id": 1827,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2607:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1830,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3468,
                        "src": "2607:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1831,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1829,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1819,
                        "src": "2628:15:12",
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
                      "src": "2607:37:12",
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
                      "id": 1832,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2647:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2607:45:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1834,
                  "nodeType": "ExpressionStatement",
                  "src": "2607:45:12"
                },
                {
                  "body": {
                    "id": 1879,
                    "nodeType": "Block",
                    "src": "2715:232:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1852,
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
                                "id": 1847,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3489,
                                "src": "2733:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3487_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1848,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3471,
                              "src": "2733:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1850,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1849,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1836,
                              "src": "2749:1:12",
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
                            "src": "2733:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1851,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1819,
                            "src": "2755:15:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2733:37:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1878,
                        "nodeType": "IfStatement",
                        "src": "2729:208:12",
                        "trueBody": {
                          "id": 1877,
                          "nodeType": "Block",
                          "src": "2772:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1866,
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
                                      "id": 1853,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2790:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1856,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2790:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1857,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1855,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1836,
                                    "src": "2806:1:12",
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
                                  "src": "2790:18:12",
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
                                      "id": 1858,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2811:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1859,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2811:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1865,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1864,
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
                                          "id": 1860,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3489,
                                          "src": "2827:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3487_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1861,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3471,
                                        "src": "2827:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1862,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2827:22:12",
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
                                      "id": 1863,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2852:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2827:26:12",
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
                                  "src": "2811:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2790:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1867,
                              "nodeType": "ExpressionStatement",
                              "src": "2790:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1874,
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
                                      "id": 1868,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2872:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1871,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2872:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1872,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2872:22:12",
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
                                  "id": 1873,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "2898:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "2872:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1875,
                              "nodeType": "ExpressionStatement",
                              "src": "2872:27:12"
                            },
                            {
                              "id": 1876,
                              "nodeType": "Break",
                              "src": "2917:5:12"
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
                    "id": 1843,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1839,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1836,
                      "src": "2682:1:12",
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
                          "id": 1840,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2686:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1841,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3471,
                        "src": "2686:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1842,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2686:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2682:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1880,
                  "initializationExpression": {
                    "assignments": [
                      1836
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1836,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1882,
                        "src": "2667:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1835,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2667:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1838,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1837,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2679:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2667:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1845,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2710:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1844,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1836,
                        "src": "2710:1:12",
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
                    "id": 1846,
                    "nodeType": "ExpressionStatement",
                    "src": "2710:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2662:285:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1882,
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
                  "referencedDeclaration": 6380,
                  "src": "2543:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2543:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1824,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1819,
                    "src": "2576:15:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1825,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1823,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3418,
                  "src": "2561:14:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2561:31:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1820,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1819,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1882,
                  "src": "2488:23:12",
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
                    "src": "2488:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2478:39:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1826,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2597:0:12"
            },
            "scope": 1948,
            "src": "2455:498:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1946,
              "nodeType": "Block",
              "src": "3240:343:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1898,
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
                          "id": 1892,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "3250:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1895,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3475,
                        "src": "3250:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1896,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1894,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1884,
                        "src": "3266:11:12",
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
                      "src": "3250:28:12",
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
                      "id": 1897,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3281:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3250:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1899,
                  "nodeType": "ExpressionStatement",
                  "src": "3250:36:12"
                },
                {
                  "body": {
                    "id": 1944,
                    "nodeType": "Block",
                    "src": "3349:228:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1917,
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
                                "id": 1912,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3489,
                                "src": "3367:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3487_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1913,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3478,
                              "src": "3367:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1915,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1914,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1901,
                              "src": "3383:1:12",
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
                            "src": "3367:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1916,
                            "name": "_setAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1884,
                            "src": "3389:11:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3367:33:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1943,
                        "nodeType": "IfStatement",
                        "src": "3363:204:12",
                        "trueBody": {
                          "id": 1942,
                          "nodeType": "Block",
                          "src": "3402:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1931,
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
                                      "id": 1918,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3420:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1921,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3420:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1922,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1920,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1901,
                                    "src": "3436:1:12",
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
                                  "src": "3420:18:12",
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
                                      "id": 1923,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3441:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1924,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3441:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1930,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1929,
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
                                          "id": 1925,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3489,
                                          "src": "3457:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3487_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1926,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3478,
                                        "src": "3457:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1927,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3457:22:12",
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
                                      "id": 1928,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3482:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3457:26:12",
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
                                  "src": "3441:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3420:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1932,
                              "nodeType": "ExpressionStatement",
                              "src": "3420:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1939,
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
                                      "id": 1933,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3502:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1936,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3502:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1937,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3502:22:12",
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
                                  "id": 1938,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3528:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3502:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1940,
                              "nodeType": "ExpressionStatement",
                              "src": "3502:27:12"
                            },
                            {
                              "id": 1941,
                              "nodeType": "Break",
                              "src": "3547:5:12"
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
                    "id": 1908,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1904,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1901,
                      "src": "3316:1:12",
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
                          "id": 1905,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "3320:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1906,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3478,
                        "src": "3320:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1907,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3320:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3316:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1945,
                  "initializationExpression": {
                    "assignments": [
                      1901
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1901,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1947,
                        "src": "3301:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1900,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3301:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1903,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1902,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3313:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3301:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1910,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3344:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1909,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1901,
                        "src": "3344:1:12",
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
                    "id": 1911,
                    "nodeType": "ExpressionStatement",
                    "src": "3344:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3296:281:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1947,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1887,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1886,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "3194:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3194:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1889,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1884,
                    "src": "3223:11:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1890,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1888,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3432,
                  "src": "3212:10:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3212:23:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1884,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1947,
                  "src": "3143:19:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1883,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3143:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3133:35:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1891,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3240:0:12"
            },
            "scope": 1948,
            "src": "3114:469:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1949,
        "src": "1002:2583:12"
      }
    ],
    "src": "597:2989:12"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1948
      ]
    },
    "id": 1949,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1753,
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
        "id": 1755,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 6433,
        "src": "622:76:12",
        "symbolAliases": [
          {
            "foreign": 1754,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1757,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 3455,
        "src": "699:63:12",
        "symbolAliases": [
          {
            "foreign": 1756,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1759,
        "nodeType": "ImportDirective",
        "scope": 1949,
        "sourceUnit": 3594,
        "src": "763:49:12",
        "symbolAliases": [
          {
            "foreign": 1758,
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
              "id": 1760,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6432,
              "src": "1031:7:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$6432",
                "typeString": "contract Ownable"
              }
            },
            "id": 1761,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1762,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1044:9:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1763,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:12"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1764,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1059:13:12",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1765,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:12"
          }
        ],
        "contractDependencies": [
          3454,
          3593,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1948,
        "linearizedBaseContracts": [
          1948,
          3454,
          3593,
          6432
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1778,
              "nodeType": "Block",
              "src": "1372:115:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1776,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1772,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1446:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1774,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3464,
                      "src": "1446:18:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1775,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1767,
                      "src": "1467:13:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1777,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:12"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1779,
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
                  "referencedDeclaration": 6380,
                  "src": "1358:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:12"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1768,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1767,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1779,
                  "src": "1305:21:12",
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
                    "src": "1305:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1771,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:12"
            },
            "scope": 1948,
            "src": "1271:216:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1792,
              "nodeType": "Block",
              "src": "1772:139:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1790,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1786,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 3489,
                        "src": "1854:5:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$3487_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1788,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3462,
                      "src": "1854:26:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1789,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1781,
                      "src": "1883:21:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1791,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:12"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1793,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1784,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1783,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "1758:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:12"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1782,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1781,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1793,
                  "src": "1697:29:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1780,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1785,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:12"
            },
            "scope": 1948,
            "src": "1655:256:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1816,
              "nodeType": "Block",
              "src": "2177:108:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1806,
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
                          "id": 1800,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2187:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1803,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3468,
                        "src": "2187:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1804,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1802,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1795,
                        "src": "2208:15:12",
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
                      "src": "2187:37:12",
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
                      "id": 1805,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1807,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:12"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1813,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1795,
                        "src": "2262:15:12",
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
                          "id": 1808,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2241:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1811,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3471,
                        "src": "2241:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1812,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "push",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2241:20:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_arraypush_nonpayable$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address) returns (uint256)"
                      }
                    },
                    "id": 1814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2241:37:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1815,
                  "nodeType": "ExpressionStatement",
                  "src": "2241:37:12"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1817,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1798,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1797,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "2163:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:12"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1796,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1795,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1817,
                  "src": "2108:23:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1794,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1799,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:12"
            },
            "scope": 1948,
            "src": "2076:209:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1881,
              "nodeType": "Block",
              "src": "2597:356:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1833,
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
                          "id": 1827,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2607:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1830,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3468,
                        "src": "2607:20:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1831,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1829,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1819,
                        "src": "2628:15:12",
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
                      "src": "2607:37:12",
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
                      "id": 1832,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2647:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2607:45:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1834,
                  "nodeType": "ExpressionStatement",
                  "src": "2607:45:12"
                },
                {
                  "body": {
                    "id": 1879,
                    "nodeType": "Block",
                    "src": "2715:232:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1852,
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
                                "id": 1847,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3489,
                                "src": "2733:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3487_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1848,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "factories",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3471,
                              "src": "2733:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1850,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1849,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1836,
                              "src": "2749:1:12",
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
                            "src": "2733:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1851,
                            "name": "_factoryAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1819,
                            "src": "2755:15:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "2733:37:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1878,
                        "nodeType": "IfStatement",
                        "src": "2729:208:12",
                        "trueBody": {
                          "id": 1877,
                          "nodeType": "Block",
                          "src": "2772:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1866,
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
                                      "id": 1853,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2790:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1856,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2790:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1857,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1855,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1836,
                                    "src": "2806:1:12",
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
                                  "src": "2790:18:12",
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
                                      "id": 1858,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2811:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1859,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2811:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1865,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1864,
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
                                          "id": 1860,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3489,
                                          "src": "2827:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3487_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1861,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "factories",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3471,
                                        "src": "2827:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1862,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "2827:22:12",
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
                                      "id": 1863,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "2852:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "2827:26:12",
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
                                  "src": "2811:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "2790:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1867,
                              "nodeType": "ExpressionStatement",
                              "src": "2790:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1874,
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
                                      "id": 1868,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "2872:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1871,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "factories",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3471,
                                    "src": "2872:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1872,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "2872:22:12",
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
                                  "id": 1873,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "2898:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "2872:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1875,
                              "nodeType": "ExpressionStatement",
                              "src": "2872:27:12"
                            },
                            {
                              "id": 1876,
                              "nodeType": "Break",
                              "src": "2917:5:12"
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
                    "id": 1843,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1839,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1836,
                      "src": "2682:1:12",
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
                          "id": 1840,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "2686:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1841,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "factories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3471,
                        "src": "2686:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1842,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2686:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2682:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1880,
                  "initializationExpression": {
                    "assignments": [
                      1836
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1836,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1882,
                        "src": "2667:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1835,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "2667:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1838,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1837,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2679:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2667:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1845,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2710:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1844,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1836,
                        "src": "2710:1:12",
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
                    "id": 1846,
                    "nodeType": "ExpressionStatement",
                    "src": "2710:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "2662:285:12"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1882,
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
                  "referencedDeclaration": 6380,
                  "src": "2543:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2543:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1824,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1819,
                    "src": "2576:15:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1825,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1823,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3418,
                  "src": "2561:14:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2561:31:12"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1820,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1819,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1882,
                  "src": "2488:23:12",
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
                    "src": "2488:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2478:39:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1826,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2597:0:12"
            },
            "scope": 1948,
            "src": "2455:498:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1946,
              "nodeType": "Block",
              "src": "3240:343:12",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1898,
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
                          "id": 1892,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "3250:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1895,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3475,
                        "src": "3250:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1896,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1894,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1884,
                        "src": "3266:11:12",
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
                      "src": "3250:28:12",
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
                      "id": 1897,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3281:5:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "3250:36:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1899,
                  "nodeType": "ExpressionStatement",
                  "src": "3250:36:12"
                },
                {
                  "body": {
                    "id": 1944,
                    "nodeType": "Block",
                    "src": "3349:228:12",
                    "statements": [
                      {
                        "condition": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          "id": 1917,
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
                                "id": 1912,
                                "name": "state",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 3489,
                                "src": "3367:5:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_struct$_State_$3487_storage",
                                  "typeString": "struct CoreState.State storage ref"
                                }
                              },
                              "id": 1913,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "memberName": "setTokens",
                              "nodeType": "MemberAccess",
                              "referencedDeclaration": 3478,
                              "src": "3367:15:12",
                              "typeDescriptions": {
                                "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                "typeString": "address[] storage ref"
                              }
                            },
                            "id": 1915,
                            "indexExpression": {
                              "argumentTypes": null,
                              "id": 1914,
                              "name": "i",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1901,
                              "src": "3383:1:12",
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
                            "src": "3367:18:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "==",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 1916,
                            "name": "_setAddress",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1884,
                            "src": "3389:11:12",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address",
                              "typeString": "address"
                            }
                          },
                          "src": "3367:33:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "falseBody": null,
                        "id": 1943,
                        "nodeType": "IfStatement",
                        "src": "3363:204:12",
                        "trueBody": {
                          "id": 1942,
                          "nodeType": "Block",
                          "src": "3402:165:12",
                          "statements": [
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1931,
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
                                      "id": 1918,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3420:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1921,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3420:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1922,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "id": 1920,
                                    "name": "i",
                                    "nodeType": "Identifier",
                                    "overloadedDeclarations": [],
                                    "referencedDeclaration": 1901,
                                    "src": "3436:1:12",
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
                                  "src": "3420:18:12",
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
                                      "id": 1923,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3441:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1924,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3441:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1930,
                                  "indexExpression": {
                                    "argumentTypes": null,
                                    "commonType": {
                                      "typeIdentifier": "t_uint256",
                                      "typeString": "uint256"
                                    },
                                    "id": 1929,
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
                                          "id": 1925,
                                          "name": "state",
                                          "nodeType": "Identifier",
                                          "overloadedDeclarations": [],
                                          "referencedDeclaration": 3489,
                                          "src": "3457:5:12",
                                          "typeDescriptions": {
                                            "typeIdentifier": "t_struct$_State_$3487_storage",
                                            "typeString": "struct CoreState.State storage ref"
                                          }
                                        },
                                        "id": 1926,
                                        "isConstant": false,
                                        "isLValue": true,
                                        "isPure": false,
                                        "lValueRequested": false,
                                        "memberName": "setTokens",
                                        "nodeType": "MemberAccess",
                                        "referencedDeclaration": 3478,
                                        "src": "3457:15:12",
                                        "typeDescriptions": {
                                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                          "typeString": "address[] storage ref"
                                        }
                                      },
                                      "id": 1927,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "memberName": "length",
                                      "nodeType": "MemberAccess",
                                      "referencedDeclaration": null,
                                      "src": "3457:22:12",
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
                                      "id": 1928,
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "kind": "number",
                                      "lValueRequested": false,
                                      "nodeType": "Literal",
                                      "src": "3482:1:12",
                                      "subdenomination": null,
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_rational_1_by_1",
                                        "typeString": "int_const 1"
                                      },
                                      "value": "1"
                                    },
                                    "src": "3457:26:12",
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
                                  "src": "3441:43:12",
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_address",
                                    "typeString": "address"
                                  }
                                },
                                "src": "3420:64:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              },
                              "id": 1932,
                              "nodeType": "ExpressionStatement",
                              "src": "3420:64:12"
                            },
                            {
                              "expression": {
                                "argumentTypes": null,
                                "id": 1939,
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
                                      "id": 1933,
                                      "name": "state",
                                      "nodeType": "Identifier",
                                      "overloadedDeclarations": [],
                                      "referencedDeclaration": 3489,
                                      "src": "3502:5:12",
                                      "typeDescriptions": {
                                        "typeIdentifier": "t_struct$_State_$3487_storage",
                                        "typeString": "struct CoreState.State storage ref"
                                      }
                                    },
                                    "id": 1936,
                                    "isConstant": false,
                                    "isLValue": true,
                                    "isPure": false,
                                    "lValueRequested": false,
                                    "memberName": "setTokens",
                                    "nodeType": "MemberAccess",
                                    "referencedDeclaration": 3478,
                                    "src": "3502:15:12",
                                    "typeDescriptions": {
                                      "typeIdentifier": "t_array$_t_address_$dyn_storage",
                                      "typeString": "address[] storage ref"
                                    }
                                  },
                                  "id": 1937,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": true,
                                  "memberName": "length",
                                  "nodeType": "MemberAccess",
                                  "referencedDeclaration": null,
                                  "src": "3502:22:12",
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
                                  "id": 1938,
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "kind": "number",
                                  "lValueRequested": false,
                                  "nodeType": "Literal",
                                  "src": "3528:1:12",
                                  "subdenomination": null,
                                  "typeDescriptions": {
                                    "typeIdentifier": "t_rational_1_by_1",
                                    "typeString": "int_const 1"
                                  },
                                  "value": "1"
                                },
                                "src": "3502:27:12",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "id": 1940,
                              "nodeType": "ExpressionStatement",
                              "src": "3502:27:12"
                            },
                            {
                              "id": 1941,
                              "nodeType": "Break",
                              "src": "3547:5:12"
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
                    "id": 1908,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1904,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1901,
                      "src": "3316:1:12",
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
                          "id": 1905,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "3320:5:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1906,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "setTokens",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3478,
                        "src": "3320:15:12",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_storage",
                          "typeString": "address[] storage ref"
                        }
                      },
                      "id": 1907,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3320:22:12",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3316:26:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1945,
                  "initializationExpression": {
                    "assignments": [
                      1901
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1901,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1947,
                        "src": "3301:9:12",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1900,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3301:7:12",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1903,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1902,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3313:1:12",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3301:13:12"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1910,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3344:3:12",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1909,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1901,
                        "src": "3344:1:12",
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
                    "id": 1911,
                    "nodeType": "ExpressionStatement",
                    "src": "3344:3:12"
                  },
                  "nodeType": "ForStatement",
                  "src": "3296:281:12"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1947,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1887,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1886,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6380,
                  "src": "3194:9:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3194:9:12"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1889,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1884,
                    "src": "3223:11:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1890,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1888,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3432,
                  "src": "3212:10:12",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3212:23:12"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1885,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1884,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1947,
                  "src": "3143:19:12",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1883,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "3143:7:12",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3133:35:12"
            },
            "payable": false,
            "returnParameters": {
              "id": 1891,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3240:0:12"
            },
            "scope": 1948,
            "src": "3114:469:12",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1949,
        "src": "1002:2583:12"
      }
    ],
    "src": "597:2989:12"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.355Z"
}