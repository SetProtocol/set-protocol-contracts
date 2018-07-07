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
  "bytecode": "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611097806100536000396000f3006080604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100eb578063124cfd78146101465780631a1f2b3e146101895780631e912bd6146101cc578063430bf08a14610211578063715018a61461026857806377274ff01461027f57806385535cc5146102c25780638ca4daf9146103055780638da5cb5b1461035c5780639f80ee88146103b3578063a003e069146103f6578063c19d93fb14610466578063f2fde38b146104f0578063f7213db614610533578063fef3ee7314610578575b600080fd5b3480156100f757600080fd5b5061012c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105d3565b604051808215151515815260200191505060405180910390f35b34801561015257600080fd5b50610187600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061062c565b005b34801561019557600080fd5b506101ca600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106cd565b005b3480156101d857600080fd5b506101fb60048036038101908080356000191690602001909291905050506108de565b6040518082815260200191505060405180910390f35b34801561021d57600080fd5b50610226610906565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561027457600080fd5b5061027d610933565b005b34801561028b57600080fd5b506102c0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a35565b005b3480156102ce57600080fd5b50610303600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c46565b005b34801561031157600080fd5b5061031a610ce8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561036857600080fd5b50610371610d14565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103bf57600080fd5b506103f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d39565b005b34801561040257600080fd5b50610424600480360381019080803560ff169060200190929190505050610df1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561047257600080fd5b5061047b610e37565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156104fc57600080fd5b50610531600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e89565b005b34801561053f57600080fd5b506105626004803603810190808035600019169060200190929190505050610ef0565b6040518082815260200191505060405180910390f35b34801561058457600080fd5b506105b9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f18565b604051808215151515815260200191505060405180910390f35b6000600160030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561068757600080fd5b806001800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561072857600080fd5b80600160030160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602681526020017f466163746f72792069732064697361626c6564206f7220646f6573206e6f742081526020017f65786973742e000000000000000000000000000000000000000000000000000081525090151561087e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610843578082015181840152602081019050610828565b50505050905090810190601f1680156108705780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000600160030160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000600160060160008360001916600019168152602001908152602001600020549050919050565b6000600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098e57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a9057600080fd5b80600160040160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602881526020017f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f81526020017f742065786973742e000000000000000000000000000000000000000000000000815250901515610be6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610bab578082015181840152602081019050610b90565b50505050905090810190601f168015610bd85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000600160040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ca157600080fd5b80600160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d9457600080fd5b60018060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600160000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60018060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ee457600080fd5b610eed81610f71565b50565b6000600160050160008360001916600019168152602001908152602001600020549050919050565b6000600160040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610fad57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058203a07ee04db3857991326aee51dbc20d19a3fdfd01755305281ed8218f31a25470029",
  "deployedBytecode": "0x6080604052600436106100e6576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100eb578063124cfd78146101465780631a1f2b3e146101895780631e912bd6146101cc578063430bf08a14610211578063715018a61461026857806377274ff01461027f57806385535cc5146102c25780638ca4daf9146103055780638da5cb5b1461035c5780639f80ee88146103b3578063a003e069146103f6578063c19d93fb14610466578063f2fde38b146104f0578063f7213db614610533578063fef3ee7314610578575b600080fd5b3480156100f757600080fd5b5061012c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105d3565b604051808215151515815260200191505060405180910390f35b34801561015257600080fd5b50610187600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061062c565b005b34801561019557600080fd5b506101ca600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106cd565b005b3480156101d857600080fd5b506101fb60048036038101908080356000191690602001909291905050506108de565b6040518082815260200191505060405180910390f35b34801561021d57600080fd5b50610226610906565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561027457600080fd5b5061027d610933565b005b34801561028b57600080fd5b506102c0600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a35565b005b3480156102ce57600080fd5b50610303600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c46565b005b34801561031157600080fd5b5061031a610ce8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561036857600080fd5b50610371610d14565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103bf57600080fd5b506103f4600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d39565b005b34801561040257600080fd5b50610424600480360381019080803560ff169060200190929190505050610df1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561047257600080fd5b5061047b610e37565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156104fc57600080fd5b50610531600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e89565b005b34801561053f57600080fd5b506105626004803603810190808035600019169060200190929190505050610ef0565b6040518082815260200191505060405180910390f35b34801561058457600080fd5b506105b9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f18565b604051808215151515815260200191505060405180910390f35b6000600160030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561068757600080fd5b806001800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561072857600080fd5b80600160030160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602681526020017f466163746f72792069732064697361626c6564206f7220646f6573206e6f742081526020017f65786973742e000000000000000000000000000000000000000000000000000081525090151561087e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610843578082015181840152602081019050610828565b50505050905090810190601f1680156108705780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000600160030160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000600160060160008360001916600019168152602001908152602001600020549050919050565b6000600160020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098e57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610a9057600080fd5b80600160040160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16606060405190810160405280602881526020017f53657420746f6b656e2069732064697361626c6564206f7220646f6573206e6f81526020017f742065786973742e000000000000000000000000000000000000000000000000815250901515610be6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610bab578082015181840152602081019050610b90565b50505050905090810190601f168015610bd85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000600160040160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ca157600080fd5b80600160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006001800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610d9457600080fd5b60018060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000600160000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60018060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610ee457600080fd5b610eed81610f71565b50565b6000600160050160008360001916600019168152602001908152602001600020549050919050565b6000600160040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610fad57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a723058203a07ee04db3857991326aee51dbc20d19a3fdfd01755305281ed8218f31a25470029",
  "sourceMap": "1002:1952:9:-;;;575:10:39;567:5;;:18;;;;;;;;;;;;;;;;;;1002:1952:9;;;;;;",
  "deployedSourceMap": "1002:1952:9:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1655:256:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1655:256:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;2408:204;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2408:204:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;2529:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2529:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;;;;;;;;;;;;;;;;;;;;827:111:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:39;;;;;;2773:179:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2773:179:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;1271:216;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1271:216:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;;;;;;;;;;;;;;;;;;;;;;;;238:20:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:39;;;;;;;;;;;;;;;;;;;;;;;;;;;2076:162:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2076:162:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;1656:147:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1656:147:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1100:103:39;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1100:103:39;;;;;;;;;;;;;;;;;;;;;;;;;;;;2377:146:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2377:146:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2239:132:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;2169:4;2196:5;:20;;:30;2217:8;2196:30;;;;;;;;;;;;;;;;;;;;;;;;;2189:37;;2083:150;;;:::o;1655:256:9:-;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1883:21:9;1854:5;:26;;;:50;;;;;;;;;;;;;;;;;;1655:256;:::o;2408:204::-;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;2529:15:9;1709:5:21;:20;;:37;1730:15;1709:37;;;;;;;;;;;;;;;;;;;;;;;;;1760:15;;;;;;;;;;;;;;;;;;;;;;;1688:97;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1688:97:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2600:5:9;2560;:20;;:37;2581:15;2560:37;;;;;;;;;;;;;;;;:45;;;;;;;;;;;;;;;;;;731:1:39;2408:204:9;:::o;2529:150:22:-;2615:4;2642:5;:18;;:30;2661:10;2642:30;;;;;;;;;;;;;;;;;;2635:37;;2529:150;;;:::o;1954:123::-;2022:7;2052:5;:18;;;;;;;;;;;;2045:25;;1954:123;:::o;827:111:39:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;903:5;;;;;;;;;;;884:25;;;;;;;;;;;;931:1;915:5;;:18;;;;;;;;;;;;;;;;;;827:111::o;2773:179:9:-;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;2882:11:9;1934:5:21;:15;;:28;1950:11;1934:28;;;;;;;;;;;;;;;;;;;;;;;;;1976:11;;;;;;;;;;;;;;;;;;;;;;;1913:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1913:84:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2940:5:9;2909;:15;;:28;2925:11;2909:28;;;;;;;;;;;;;;;;:36;;;;;;;;;;;;;;;;;;731:1:39;2773:179:9;:::o;1271:216::-;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1467:13:9;1446:5;:18;;;:34;;;;;;;;;;;;;;;;;;1271:216;:::o;1809:139:22:-;1885:7;1915:5;:26;;;;;;;;;;;;1908:33;;1809:139;:::o;238:20:39:-;;;;;;;;;;;;;:::o;2076:162:9:-;719:5:39;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;2227:4:9;2187:5;:20;;:37;2208:15;2187:37;;;;;;;;;;;;;;;;:44;;;;;;;;;;;;;;;;;;2076:162;:::o;1656:147:22:-;1738:7;1768:5;:15;;:28;1784:11;1768:28;;;;;;;;;;;;;;;;;;;;;;;;;1761:35;;1656:147;;;:::o;1579:18::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;1100:103:39:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;2377:146:22:-;2461:4;2488:5;:16;;:28;2505:10;2488:28;;;;;;;;;;;;;;;;;;2481:35;;2377:146;;;:::o;2239:132::-;2316:4;2343:5;:15;;:21;2359:4;2343:21;;;;;;;;;;;;;;;;;;;;;;;;;2336:28;;2239:132;;;:::o;1338:171:39:-;1429:1;1408:23;;:9;:23;;;;1400:32;;;;;;;;1471:9;1443:38;;1464:5;;;;;;;;;;;1443:38;;;;;;;;;;;;1495:9;1487:5;;:17;;;;;;;;;;;;;;;;;;1338:171;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { Ownable } from \"zeppelin-solidity/contracts/ownership/Ownable.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\n\n\n/**\n * @title Core Internal\n * @author Set Protocol\n *\n * The CoreInternal contract contains methods to alter state that tracks contract\n * addresses that need to interact with Core.\n */\ncontract CoreInternal is\n    Ownable,\n    CoreState,\n    CoreModifiers\n{\n    /* ============ Setter Functions ============ */\n\n    /**\n     * Set vaultAddress. Can only be set by owner of Core.\n     *\n     * @param  _vaultAddress   The address of the Vault\n     */\n    function setVaultAddress(\n        address _vaultAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to vaultAddress state variable\n        state.vaultAddress = _vaultAddress;\n    }\n\n    /**\n     * Set transferProxyAddress. Can only be set by owner of Core.\n     *\n     * @param  _transferProxyAddress   The address of the TransferProxy\n     */\n    function setTransferProxyAddress(\n        address _transferProxyAddress\n    )\n        external\n        onlyOwner\n    {\n        // Commit passed address to transferProxyAddress state variable\n        state.transferProxyAddress = _transferProxyAddress;\n    }\n\n    /**\n     * Add a factory to the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable\n     */\n    function enableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n    {\n        state.validFactories[_factoryAddress] = true;\n    }\n\n    /**\n     * Disable a factory in the mapping of tracked factories.\n     *\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable\n     */\n    function disableFactory(\n        address _factoryAddress\n    )\n        external\n        onlyOwner\n        isValidFactory(_factoryAddress)\n    {\n        state.validFactories[_factoryAddress] = false;\n    }\n\n    /**\n     * Disable a set token in the mapping of tracked set tokens.\n     *\n     * @param  _setAddress   The address of the SetToken to remove\n     */\n    function disableSet(\n        address _setAddress\n    )\n        external\n        onlyOwner\n        isValidSet(_setAddress)\n    {\n        state.validSets[_setAddress] = false;\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1359
      ]
    },
    "id": 1360,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1264,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1266,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 4825,
        "src": "622:76:9",
        "symbolAliases": [
          {
            "foreign": 1265,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1268,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 2639,
        "src": "699:63:9",
        "symbolAliases": [
          {
            "foreign": 1267,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1270,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 2752,
        "src": "763:49:9",
        "symbolAliases": [
          {
            "foreign": 1269,
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
              "id": 1271,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4824,
              "src": "1031:7:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$4824",
                "typeString": "contract Ownable"
              }
            },
            "id": 1272,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1273,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1044:9:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1274,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1275,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1059:13:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1276,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:9"
          }
        ],
        "contractDependencies": [
          2638,
          2751,
          4824
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1359,
        "linearizedBaseContracts": [
          1359,
          2638,
          2751,
          4824
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1289,
              "nodeType": "Block",
              "src": "1372:115:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1287,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1283,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1446:5:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1285,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2648,
                      "src": "1446:18:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1286,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1278,
                      "src": "1467:13:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1288,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:9"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1290,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1281,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1280,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1358:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:9"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1279,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1278,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1290,
                  "src": "1305:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1277,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1305:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1282,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:9"
            },
            "scope": 1359,
            "src": "1271:216:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1303,
              "nodeType": "Block",
              "src": "1772:139:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1301,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1297,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1854:5:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1299,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2646,
                      "src": "1854:26:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1300,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1292,
                      "src": "1883:21:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1302,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:9"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1304,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1295,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1294,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1758:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:9"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1292,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1304,
                  "src": "1697:29:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1291,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:9"
            },
            "scope": 1359,
            "src": "1655:256:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1319,
              "nodeType": "Block",
              "src": "2177:61:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1317,
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
                          "id": 1311,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2187:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1314,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2652,
                        "src": "2187:20:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1315,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1313,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1306,
                        "src": "2208:15:9",
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
                      "src": "2187:37:9",
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
                      "id": 1316,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1318,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:9"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1320,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1309,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1308,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2163:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:9"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1307,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1306,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "2108:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1305,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1310,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:9"
            },
            "scope": 1359,
            "src": "2076:162:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1338,
              "nodeType": "Block",
              "src": "2550:62:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1336,
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
                          "id": 1330,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2560:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1333,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2652,
                        "src": "2560:20:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1334,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1332,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1322,
                        "src": "2581:15:9",
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
                      "src": "2560:37:9",
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
                      "id": 1335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2600:5:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2560:45:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1337,
                  "nodeType": "ExpressionStatement",
                  "src": "2560:45:9"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1339,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1325,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1324,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2496:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2496:9:9"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1327,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1322,
                    "src": "2529:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1328,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1326,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2602,
                  "src": "2514:14:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2514:31:9"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1323,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1339,
                  "src": "2441:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1321,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:39:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1329,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2550:0:9"
            },
            "scope": 1359,
            "src": "2408:204:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1357,
              "nodeType": "Block",
              "src": "2899:53:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1355,
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
                          "id": 1349,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2909:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1352,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2656,
                        "src": "2909:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1353,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1351,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1341,
                        "src": "2925:11:9",
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
                      "src": "2909:28:9",
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
                      "id": 1354,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2940:5:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2909:36:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1356,
                  "nodeType": "ExpressionStatement",
                  "src": "2909:36:9"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1358,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1344,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1343,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2853:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2853:9:9"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1346,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1341,
                    "src": "2882:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1347,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1345,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2616,
                  "src": "2871:10:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2871:23:9"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1341,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1358,
                  "src": "2802:19:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2802:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2792:35:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2899:0:9"
            },
            "scope": 1359,
            "src": "2773:179:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1360,
        "src": "1002:1952:9"
      }
    ],
    "src": "597:2358:9"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreInternal.sol",
    "exportedSymbols": {
      "CoreInternal": [
        1359
      ]
    },
    "id": 1360,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1264,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "file": "zeppelin-solidity/contracts/ownership/Ownable.sol",
        "id": 1266,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 4825,
        "src": "622:76:9",
        "symbolAliases": [
          {
            "foreign": 1265,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1268,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 2639,
        "src": "699:63:9",
        "symbolAliases": [
          {
            "foreign": 1267,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1270,
        "nodeType": "ImportDirective",
        "scope": 1360,
        "sourceUnit": 2752,
        "src": "763:49:9",
        "symbolAliases": [
          {
            "foreign": 1269,
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
              "id": 1271,
              "name": "Ownable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4824,
              "src": "1031:7:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Ownable_$4824",
                "typeString": "contract Ownable"
              }
            },
            "id": 1272,
            "nodeType": "InheritanceSpecifier",
            "src": "1031:7:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1273,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1044:9:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 1274,
            "nodeType": "InheritanceSpecifier",
            "src": "1044:9:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1275,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1059:13:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1276,
            "nodeType": "InheritanceSpecifier",
            "src": "1059:13:9"
          }
        ],
        "contractDependencies": [
          2638,
          2751,
          4824
        ],
        "contractKind": "contract",
        "documentation": "@title Core Internal\n@author Set Protocol\n * The CoreInternal contract contains methods to alter state that tracks contract\naddresses that need to interact with Core.",
        "fullyImplemented": true,
        "id": 1359,
        "linearizedBaseContracts": [
          1359,
          2638,
          2751,
          4824
        ],
        "name": "CoreInternal",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "body": {
              "id": 1289,
              "nodeType": "Block",
              "src": "1372:115:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1287,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1283,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1446:5:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1285,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "vaultAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2648,
                      "src": "1446:18:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1286,
                      "name": "_vaultAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1278,
                      "src": "1467:13:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1446:34:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1288,
                  "nodeType": "ExpressionStatement",
                  "src": "1446:34:9"
                }
              ]
            },
            "documentation": "Set vaultAddress. Can only be set by owner of Core.\n     * @param  _vaultAddress   The address of the Vault",
            "id": 1290,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1281,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1280,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1358:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1358:9:9"
              }
            ],
            "name": "setVaultAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1279,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1278,
                  "name": "_vaultAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1290,
                  "src": "1305:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1277,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1305:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1295:37:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1282,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1372:0:9"
            },
            "scope": 1359,
            "src": "1271:216:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1303,
              "nodeType": "Block",
              "src": "1772:139:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1301,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "id": 1297,
                        "name": "state",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 2667,
                        "src": "1854:5:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_State_$2665_storage",
                          "typeString": "struct CoreState.State storage ref"
                        }
                      },
                      "id": 1299,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "transferProxyAddress",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2646,
                      "src": "1854:26:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1300,
                      "name": "_transferProxyAddress",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1292,
                      "src": "1883:21:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "src": "1854:50:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "id": 1302,
                  "nodeType": "ExpressionStatement",
                  "src": "1854:50:9"
                }
              ]
            },
            "documentation": "Set transferProxyAddress. Can only be set by owner of Core.\n     * @param  _transferProxyAddress   The address of the TransferProxy",
            "id": 1304,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1295,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1294,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "1758:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1758:9:9"
              }
            ],
            "name": "setTransferProxyAddress",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1293,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1292,
                  "name": "_transferProxyAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1304,
                  "src": "1697:29:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1291,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1697:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1687:45:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1296,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1772:0:9"
            },
            "scope": 1359,
            "src": "1655:256:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1319,
              "nodeType": "Block",
              "src": "2177:61:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1317,
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
                          "id": 1311,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2187:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1314,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2652,
                        "src": "2187:20:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1315,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1313,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1306,
                        "src": "2208:15:9",
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
                      "src": "2187:37:9",
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
                      "id": 1316,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2227:4:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "2187:44:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1318,
                  "nodeType": "ExpressionStatement",
                  "src": "2187:44:9"
                }
              ]
            },
            "documentation": "Add a factory to the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to enable",
            "id": 1320,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1309,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1308,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2163:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2163:9:9"
              }
            ],
            "name": "enableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1307,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1306,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "2108:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1305,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2108:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2098:39:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1310,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2177:0:9"
            },
            "scope": 1359,
            "src": "2076:162:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1338,
              "nodeType": "Block",
              "src": "2550:62:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1336,
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
                          "id": 1330,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2560:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1333,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validFactories",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2652,
                        "src": "2560:20:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1334,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1332,
                        "name": "_factoryAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1322,
                        "src": "2581:15:9",
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
                      "src": "2560:37:9",
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
                      "id": 1335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2600:5:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2560:45:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1337,
                  "nodeType": "ExpressionStatement",
                  "src": "2560:45:9"
                }
              ]
            },
            "documentation": "Disable a factory in the mapping of tracked factories.\n     * @param  _factoryAddress   The address of the SetTokenFactory to disable",
            "id": 1339,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1325,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1324,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2496:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2496:9:9"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1327,
                    "name": "_factoryAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1322,
                    "src": "2529:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1328,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1326,
                  "name": "isValidFactory",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2602,
                  "src": "2514:14:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2514:31:9"
              }
            ],
            "name": "disableFactory",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1323,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_factoryAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1339,
                  "src": "2441:23:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1321,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2441:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2431:39:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1329,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2550:0:9"
            },
            "scope": 1359,
            "src": "2408:204:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1357,
              "nodeType": "Block",
              "src": "2899:53:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1355,
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
                          "id": 1349,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2667,
                          "src": "2909:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$2665_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1352,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "validSets",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2656,
                        "src": "2909:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 1353,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 1351,
                        "name": "_setAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1341,
                        "src": "2925:11:9",
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
                      "src": "2909:28:9",
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
                      "id": 1354,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2940:5:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "false"
                    },
                    "src": "2909:36:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1356,
                  "nodeType": "ExpressionStatement",
                  "src": "2909:36:9"
                }
              ]
            },
            "documentation": "Disable a set token in the mapping of tracked set tokens.\n     * @param  _setAddress   The address of the SetToken to remove",
            "id": 1358,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1344,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1343,
                  "name": "onlyOwner",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4772,
                  "src": "2853:9:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2853:9:9"
              },
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1346,
                    "name": "_setAddress",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1341,
                    "src": "2882:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  }
                ],
                "id": 1347,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1345,
                  "name": "isValidSet",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2616,
                  "src": "2871:10:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_address_$",
                    "typeString": "modifier (address)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2871:23:9"
              }
            ],
            "name": "disableSet",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1342,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1341,
                  "name": "_setAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1358,
                  "src": "2802:19:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1340,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2802:7:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2792:35:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2899:0:9"
            },
            "scope": 1359,
            "src": "2773:179:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 1360,
        "src": "1002:1952:9"
      }
    ],
    "src": "597:2358:9"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.897Z"
}