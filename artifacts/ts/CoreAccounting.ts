export const CoreAccounting = 
{
  "contractName": "CoreAccounting",
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
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddresses",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchDeposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddresses",
          "type": "address[]"
        },
        {
          "name": "_quantities",
          "type": "uint256[]"
        }
      ],
      "name": "batchWithdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506113aa806100206000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100bf5780631e912bd61461011a57806330a907361461015f578063430bf08a146101b257806347e7ef24146102095780638ca4daf914610256578063a003e069146102ad578063c19d93fb1461031d578063e131243e146103a7578063f3fef3a3146103fa578063f7213db614610447578063fef3ee731461048c575b600080fd5b3480156100cb57600080fd5b50610100600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104e7565b604051808215151515815260200191505060405180910390f35b34801561012657600080fd5b50610149600480360381019080803560001916906020019092919050505061053f565b6040518082815260200191505060405180910390f35b34801561016b57600080fd5b506101b0600480360381019080803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610566565b005b3480156101be57600080fd5b506101c7610909565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561021557600080fd5b50610254600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610935565b005b34801561026257600080fd5b5061026b610c6d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102b957600080fd5b506102db600480360381019080803560ff169060200190929190505050610c99565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561032957600080fd5b50610332610cde565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156103b357600080fd5b506103f8600480360381019080803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610d30565b005b34801561040657600080fd5b50610445600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d3565b005b34801561045357600080fd5b5061047660048036038101908080356000191690602001909291905050506112ff565b6040518082815260200191505060405180910390f35b34801561049857600080fd5b506104cd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611326565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b600084848080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505083838080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505060008251116040805190810160405280601c81526020017f416464726573736573206d757374206e6f7420626520656d7074792e000000008152509015156106ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610670578082015181840152602081019050610655565b50505050905090810190601f16801561069d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008151116040805190810160405280601d81526020017f5175616e746974696573206d757374206e6f7420626520656d7074792e00000081525090151561078f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610754578082015181840152602081019050610739565b50505050905090810190601f1680156107815780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508051825114606060405190810160405280603181526020017f41646472657373657320616e64207175616e746974696573206d75737420626581526020017f207468652073616d65206c656e6774682e00000000000000000000000000000081525090151561089a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561085f578082015181840152602081019050610844565b50505050905090810190601f16801561088c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600092505b86869050831015610900576108f387878581811015156108bc57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156108e757fe5b90506020020135610935565b82806001019350506108a0565b50505050505050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8060008111606060405190810160405280602381526020017f5175616e74697479206d7573742062652067726561746572207468616e207a6581526020017f726f2e0000000000000000000000000000000000000000000000000000000000815250901515610a3f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a045780820151818401526020810190506109e9565b50505050905090810190601f168015610a315780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166303ee22953385856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610b3c57600080fd5b505af1158015610b50573d6000803e3d6000fd5b50505050600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bada57263385856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610c5057600080fd5b505af1158015610c64573d6000803e3d6000fd5b50505050505050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b600084848080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505083838080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505060008251116040805190810160405280601c81526020017f416464726573736573206d757374206e6f7420626520656d7074792e00000000815250901515610e75576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610e3a578082015181840152602081019050610e1f565b50505050905090810190601f168015610e675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008151116040805190810160405280601d81526020017f5175616e746974696573206d757374206e6f7420626520656d7074792e000000815250901515610f59576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f1e578082015181840152602081019050610f03565b50505050905090810190601f168015610f4b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508051825114606060405190810160405280603181526020017f41646472657373657320616e64207175616e746974696573206d75737420626581526020017f207468652073616d65206c656e6774682e000000000000000000000000000000815250901515611064576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561102957808201518184015260208101905061100e565b50505050905090810190601f1680156110565780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600092505b868690508310156110ca576110bd878785818110151561108657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156110b157fe5b905060200201356110d3565b828060010193505061106a565b50505050505050565b600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166380ddda303384846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156111cf57600080fd5b505af11580156111e3573d6000803e3d6000fd5b50505050600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3b35a7e8333846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156112e357600080fd5b505af11580156112f7573d6000803e3d6000fd5b505050505050565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058201d8f134bb468515ef516fc187011140f2e0a38b5367ee224003dd96aa99cba690029",
  "deployedBytecode": "0x6080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e4355d4146100bf5780631e912bd61461011a57806330a907361461015f578063430bf08a146101b257806347e7ef24146102095780638ca4daf914610256578063a003e069146102ad578063c19d93fb1461031d578063e131243e146103a7578063f3fef3a3146103fa578063f7213db614610447578063fef3ee731461048c575b600080fd5b3480156100cb57600080fd5b50610100600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506104e7565b604051808215151515815260200191505060405180910390f35b34801561012657600080fd5b50610149600480360381019080803560001916906020019092919050505061053f565b6040518082815260200191505060405180910390f35b34801561016b57600080fd5b506101b0600480360381019080803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610566565b005b3480156101be57600080fd5b506101c7610909565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561021557600080fd5b50610254600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610935565b005b34801561026257600080fd5b5061026b610c6d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102b957600080fd5b506102db600480360381019080803560ff169060200190929190505050610c99565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561032957600080fd5b50610332610cde565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390f35b3480156103b357600080fd5b506103f8600480360381019080803590602001908201803590602001919091929391929390803590602001908201803590602001919091929391929390505050610d30565b005b34801561040657600080fd5b50610445600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506110d3565b005b34801561045357600080fd5b5061047660048036038101908080356000191690602001909291905050506112ff565b6040518082815260200191505060405180910390f35b34801561049857600080fd5b506104cd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611326565b604051808215151515815260200191505060405180910390f35b60008060030160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060060160008360001916600019168152602001908152602001600020549050919050565b600084848080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505083838080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505060008251116040805190810160405280601c81526020017f416464726573736573206d757374206e6f7420626520656d7074792e000000008152509015156106ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610670578082015181840152602081019050610655565b50505050905090810190601f16801561069d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008151116040805190810160405280601d81526020017f5175616e746974696573206d757374206e6f7420626520656d7074792e00000081525090151561078f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610754578082015181840152602081019050610739565b50505050905090810190601f1680156107815780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508051825114606060405190810160405280603181526020017f41646472657373657320616e64207175616e746974696573206d75737420626581526020017f207468652073616d65206c656e6774682e00000000000000000000000000000081525090151561089a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561085f578082015181840152602081019050610844565b50505050905090810190601f16801561088c5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600092505b86869050831015610900576108f387878581811015156108bc57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156108e757fe5b90506020020135610935565b82806001019350506108a0565b50505050505050565b60008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b8060008111606060405190810160405280602381526020017f5175616e74697479206d7573742062652067726561746572207468616e207a6581526020017f726f2e0000000000000000000000000000000000000000000000000000000000815250901515610a3f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a045780820151818401526020810190506109e9565b50505050905090810190601f168015610a315780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166303ee22953385856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610b3c57600080fd5b505af1158015610b50573d6000803e3d6000fd5b50505050600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bada57263385856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b158015610c5057600080fd5b505af1158015610c64573d6000803e3d6000fd5b50505050505050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060000160008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b600084848080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505083838080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505060008251116040805190810160405280601c81526020017f416464726573736573206d757374206e6f7420626520656d7074792e00000000815250901515610e75576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610e3a578082015181840152602081019050610e1f565b50505050905090810190601f168015610e675780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008151116040805190810160405280601d81526020017f5175616e746974696573206d757374206e6f7420626520656d7074792e000000815250901515610f59576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610f1e578082015181840152602081019050610f03565b50505050905090810190601f168015610f4b5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508051825114606060405190810160405280603181526020017f41646472657373657320616e64207175616e746974696573206d75737420626581526020017f207468652073616d65206c656e6774682e000000000000000000000000000000815250901515611064576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561102957808201518184015260208101905061100e565b50505050905090810190601f1680156110565780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600092505b868690508310156110ca576110bd878785818110151561108657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff1686868681811015156110b157fe5b905060200201356110d3565b828060010193505061106a565b50505050505050565b600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166380ddda303384846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156111cf57600080fd5b505af11580156111e3573d6000803e3d6000fd5b50505050600060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3b35a7e8333846040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b1580156112e357600080fd5b505af11580156112f7573d6000803e3d6000fd5b505050505050565b60008060050160008360001916600019168152602001908152602001600020549050919050565b60008060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690509190505600a165627a7a723058201d8f134bb468515ef516fc187011140f2e0a38b5367ee224003dd96aa99cba690029",
  "sourceMap": "1113:4249:6:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1113:4249:6;;;;;;;",
  "deployedSourceMap": "1113:4249:6:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2529:150:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2704:420:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2704:420:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;;;;;;;;;;;;;;;;;;;;4076:576:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4076:576:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;;;;;;;;;;;;;;;;;;;;;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1656:147:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3443:423:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3443:423:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4862:498;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4862:498:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2377:146:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2377:146:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2239:132:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150;2169:4;2196:5;:20;;:30;2217:8;2196:30;;;;;;;;;;;;;;;;;;;;;;;;;2189:37;;2083:150;;;:::o;2529:::-;2615:4;2642:5;:18;;:30;2661:10;2642:30;;;;;;;;;;;;;;;;;;2635:37;;2529:150;;;:::o;2704:420:6:-;2959:6;2844:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2861:11;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1937:1;1912:15;:22;:26;1952:17;;;;;;;;;;;;;;;;;;1891:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1891:88:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2092:1;2071:11;:18;:22;2107:17;;;;;;;;;;;;;;;;;;2050:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;2050:84:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2257:11;:18;2231:15;:22;:44;2289:20;;;;;;;;;;;;;;;;;;;;;;;2210:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;2210:109:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2968:1;2959:10;;2954:164;2975:15;;:22;;2971:1;:26;2954:164;;;3018:89;3043:15;;3059:1;3043:18;;;;;;;;;;;;;;;;;3079:11;;3091:1;3079:14;;;;;;;;;;;;;;;3018:7;:89::i;:::-;2999:3;;;;;;;2954:164;;;2704:420;;;;;;;:::o;1954:123:22:-;2022:7;2052:5;:18;;;;;;;;;;;;2045:25;;1954:123;:::o;4076:576:6:-;4196:9;1527:1:21;1515:9;:13;1542;;;;;;;;;;;;;;;;;;;;;;;1494:71;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1494:71:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;4308:5:6;:26;;;;;;;;;;;;4293:58;;;4365:10;4389:13;4416:9;4293:142;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4293:142:6;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;4293:142:6;;;;4522:5;:18;;;;;;;;;;;;4515:46;;;4575:10;4599:13;4626:9;4515:130;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;4515:130:6;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;4515:130:6;;;;4076:576;;;:::o;1809:139:22:-;1885:7;1915:5;:26;;;;;;;;;;;;1908:33;;1809:139;:::o;1656:147::-;1738:7;1768:5;:15;;:28;1784:11;1768:28;;;;;;;;;;;;;;;;;;;;;;;;;1761:35;;1656:147;;;:::o;1579:18::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;3443:423:6:-;3700:6;3584:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3601:11;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1937:1;1912:15;:22;:26;1952:17;;;;;;;;;;;;;;;;;;1891:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;1891:88:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2092:1;2071:11;:18;:22;2107:17;;;;;;;;;;;;;;;;;;2050:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;2050:84:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2257:11;:18;2231:15;:22;:44;2289:20;;;;;;;;;;;;;;;;;;;;;;;2210:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;2210:109:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3709:1;3700:10;;3695:165;3716:15;;:22;;3712:1;:26;3695:165;;;3759:90;3785:15;;3801:1;3785:18;;;;;;;;;;;;;;;;;3821:11;;3833:1;3821:14;;;;;;;;;;;;;;;3759:8;:90::i;:::-;3740:3;;;;;;;3695:165;;;3443:423;;;;;;;:::o;4862:498::-;5038:5;:18;;;;;;;;;;;;5031:46;;;5091:10;5115:13;5142:9;5031:130;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5031:130:6;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5031:130:6;;;;5239:5;:18;;;;;;;;;;;;5232:37;;;5283:13;5310:10;5334:9;5232:121;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5232:121:6;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5232:121:6;;;;4862:498;;:::o;2377:146:22:-;2461:4;2488:5;:16;;:28;2505:10;2488:28;;;;;;;;;;;;;;;;;;2481:35;;2377:146;;;:::o;2239:132::-;2316:4;2343:5;:15;;:21;2359:4;2343:21;;;;;;;;;;;;;;;;;;;;;;;;;2336:28;;2239:132;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant ADDRESSES_MISSING = \"Addresses must not be empty.\";\n    string constant BATCH_INPUT_MISMATCH = \"Addresses and quantities must be the same length.\";\n    string constant QUANTITES_MISSING = \"Quantities must not be empty.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n\n    /* ============ Modifiers ============ */\n\n    // Confirm that all inputs are valid for batch transactions\n    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {\n        // Confirm an empty _addresses array is not passed\n        require(\n            _tokenAddresses.length > 0,\n            ADDRESSES_MISSING\n        );\n\n        // Confirm an empty _quantities array is not passed\n        require(\n            _quantities.length > 0,\n            QUANTITES_MISSING\n        );\n\n        // Confirm there is one quantity for every token address\n        require(\n            _tokenAddresses.length == _quantities.length,\n            BATCH_INPUT_MISMATCH\n        );\n        _;\n    }\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run deposit function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            deposit(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run withdraw function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            withdraw(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n        isPositiveQuantity(_quantity)\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxyAddress).transferToVault(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vaultAddress).incrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n    {\n        // Call Vault contract to deattribute tokens to user\n        IVault(state.vaultAddress).decrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        IVault(state.vaultAddress).withdrawTo(\n            _tokenAddress,\n            msg.sender,\n            _quantity\n        );\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1127
      ]
    },
    "id": 1128,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 927,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 929,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 4739,
        "src": "622:73:6",
        "symbolAliases": [
          {
            "foreign": 928,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 931,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2639,
        "src": "696:63:6",
        "symbolAliases": [
          {
            "foreign": 930,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 933,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2752,
        "src": "760:49:6",
        "symbolAliases": [
          {
            "foreign": 932,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 935,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2517,
        "src": "810:66:6",
        "symbolAliases": [
          {
            "foreign": 934,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 937,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2556,
        "src": "877:50:6",
        "symbolAliases": [
          {
            "foreign": 936,
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
              "id": 938,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1144:9:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 939,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 940,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1159:13:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 941,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:6"
          }
        ],
        "contractDependencies": [
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1127,
        "linearizedBaseContracts": [
          1127,
          2638,
          2751
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 944,
            "libraryName": {
              "contractScope": null,
              "id": 942,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1240:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:6",
            "typeName": {
              "id": 943,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 947,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1314:66:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 945,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 946,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d4a195b4cf9e73a77ea63711a903227f3150e3627941a137d172dc797b82cd84",
                "typeString": "literal_string \"Addresses must not be empty.\""
              },
              "value": "Addresses must not be empty."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 950,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1386:90:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 948,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 949,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_318e95b0e08a378091697c889a887ce37fc37d71fa98e0de98a8e0acdda536f1",
                "typeString": "literal_string \"Addresses and quantities must be the same length.\""
              },
              "value": "Addresses and quantities must be the same length."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 953,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1482:67:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 951,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 952,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_7fd703fbbd234863ddc498f6ccb7e69d3003879a21aabd2ddb6d2773c3639cf0",
                "typeString": "literal_string \"Quantities must not be empty.\""
              },
              "value": "Quantities must not be empty."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 956,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1555:69:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 954,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 955,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_3da6978e12ad268e4eb66f4a79840b60e48f93e78540f7911187ddd7f0f6f2c7",
                "typeString": "literal_string \"Quantity must be greater than zero.\""
              },
              "value": "Quantity must be greater than zero."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 990,
              "nodeType": "Block",
              "src": "1822:515:6",
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
                        "id": 968,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 965,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 959,
                            "src": "1912:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 966,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 969,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 947,
                        "src": "1952:17:6",
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
                      "id": 964,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1891:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 971,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:6"
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
                        "id": 976,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 973,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 962,
                            "src": "2071:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 974,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 975,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 977,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 953,
                        "src": "2107:17:6",
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
                      "id": 972,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2050:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 978,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 979,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:6"
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
                        "id": 985,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 981,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 959,
                            "src": "2231:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 982,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 983,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 962,
                            "src": "2257:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 984,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 986,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 950,
                        "src": "2289:20:6",
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
                      "id": 980,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2210:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 987,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 988,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:6"
                },
                {
                  "id": 989,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:6"
                }
              ]
            },
            "documentation": null,
            "id": 991,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 963,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 959,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 991,
                  "src": "1775:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 957,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 958,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 962,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 991,
                  "src": "1802:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 960,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 961,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:6"
            },
            "src": "1742:595:6",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1026,
              "nodeType": "Block",
              "src": "2878:246:6",
              "statements": [
                {
                  "body": {
                    "id": 1024,
                    "nodeType": "Block",
                    "src": "3004:114:6",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1016,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 994,
                                "src": "3043:15:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1018,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1017,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1005,
                                "src": "3059:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3043:18:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1019,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 997,
                                "src": "3079:11:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1021,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1020,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1005,
                                "src": "3091:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3079:14:6",
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1015,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1096,
                            "src": "3018:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1022,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1023,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1011,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1008,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1005,
                      "src": "2971:1:6",
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
                        "id": 1009,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 994,
                        "src": "2975:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1010,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1025,
                  "initializationExpression": {
                    "assignments": [
                      1005
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1005,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1027,
                        "src": "2959:6:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1004,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1007,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1013,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1012,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1005,
                        "src": "2999:1:6",
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
                    "id": 1014,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:6"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1027,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1000,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 994,
                    "src": "2844:15:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1001,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 997,
                    "src": "2861:11:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1002,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 999,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 991,
                  "src": "2820:23:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:6"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 998,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 994,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1027,
                  "src": "2735:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 992,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 993,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 997,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1027,
                  "src": "2770:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 995,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 996,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1003,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:6"
            },
            "scope": 1127,
            "src": "2704:420:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1062,
              "nodeType": "Block",
              "src": "3618:248:6",
              "statements": [
                {
                  "body": {
                    "id": 1060,
                    "nodeType": "Block",
                    "src": "3745:115:6",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1052,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1030,
                                "src": "3785:15:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1054,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1053,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1041,
                                "src": "3801:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3785:18:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1055,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1033,
                                "src": "3821:11:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1057,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1056,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1041,
                                "src": "3833:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3821:14:6",
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1051,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1126,
                            "src": "3759:8:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1058,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1059,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1047,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1044,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1041,
                      "src": "3712:1:6",
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
                        "id": 1045,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1030,
                        "src": "3716:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1046,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1061,
                  "initializationExpression": {
                    "assignments": [
                      1041
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1041,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1063,
                        "src": "3700:6:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1040,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1043,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1042,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1049,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1048,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1041,
                        "src": "3740:1:6",
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
                    "id": 1050,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:6"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1063,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1036,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1030,
                    "src": "3584:15:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1037,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1033,
                    "src": "3601:11:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1038,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1035,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 991,
                  "src": "3560:23:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:6"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1030,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1063,
                  "src": "3475:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1028,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1029,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1033,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1063,
                  "src": "3510:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1031,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1032,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1039,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:6"
            },
            "scope": 1127,
            "src": "3443:423:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1095,
              "nodeType": "Block",
              "src": "4211:441:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1078,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "4365:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1079,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4365:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1080,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1065,
                        "src": "4389:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1081,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1067,
                        "src": "4416:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1074,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4308:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1075,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2646,
                            "src": "4308:26:6",
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
                          "id": 1073,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2516,
                          "src": "4293:14:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2516_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1076,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2516",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1077,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferToVault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2515,
                      "src": "4293:58:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1082,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:142:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1083,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:142:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1089,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "4575:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1090,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4575:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1091,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1065,
                        "src": "4599:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1092,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1067,
                        "src": "4626:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1085,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4522:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1086,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "4522:18:6",
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
                          "id": 1084,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "4515:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1087,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4515:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1088,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2536,
                      "src": "4515:46:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1093,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4515:130:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1094,
                  "nodeType": "ExpressionStatement",
                  "src": "4515:130:6"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1096,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1070,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1067,
                    "src": "4196:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1071,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1069,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "4177:18:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:6"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1068,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1065,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1096,
                  "src": "4102:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1064,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:6",
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
                  "id": 1067,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1096,
                  "src": "4133:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1066,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1072,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:6"
            },
            "scope": 1127,
            "src": "4076:576:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1125,
              "nodeType": "Block",
              "src": "4960:400:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1108,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "5091:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1109,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5091:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1110,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1098,
                        "src": "5115:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1111,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "5142:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1104,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5038:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1105,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "5038:18:6",
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
                          "id": 1103,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "5031:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1106,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5031:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1107,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2545,
                      "src": "5031:46:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5031:130:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1113,
                  "nodeType": "ExpressionStatement",
                  "src": "5031:130:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1119,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1098,
                        "src": "5283:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1120,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "5310:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1121,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5310:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1122,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "5334:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1115,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5239:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1116,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "5239:18:6",
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
                          "id": 1114,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "5232:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1117,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5232:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1118,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2527,
                      "src": "5232:37:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1123,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5232:121:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1124,
                  "nodeType": "ExpressionStatement",
                  "src": "5232:121:6"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1126,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1101,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1098,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1126,
                  "src": "4889:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1097,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4889:7:6",
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
                  "id": 1100,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1126,
                  "src": "4920:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1099,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4920:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4879:61:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1102,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4960:0:6"
            },
            "scope": 1127,
            "src": "4862:498:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1128,
        "src": "1113:4249:6"
      }
    ],
    "src": "597:4766:6"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1127
      ]
    },
    "id": 1128,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 927,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:6"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 929,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 4739,
        "src": "622:73:6",
        "symbolAliases": [
          {
            "foreign": 928,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 931,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2639,
        "src": "696:63:6",
        "symbolAliases": [
          {
            "foreign": 930,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 933,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2752,
        "src": "760:49:6",
        "symbolAliases": [
          {
            "foreign": 932,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 935,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2517,
        "src": "810:66:6",
        "symbolAliases": [
          {
            "foreign": 934,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 937,
        "nodeType": "ImportDirective",
        "scope": 1128,
        "sourceUnit": 2556,
        "src": "877:50:6",
        "symbolAliases": [
          {
            "foreign": 936,
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
              "id": 938,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2751,
              "src": "1144:9:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$2751",
                "typeString": "contract CoreState"
              }
            },
            "id": 939,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:6"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 940,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2638,
              "src": "1159:13:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2638",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 941,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:6"
          }
        ],
        "contractDependencies": [
          2638,
          2751
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1127,
        "linearizedBaseContracts": [
          1127,
          2638,
          2751
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 944,
            "libraryName": {
              "contractScope": null,
              "id": 942,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4738,
              "src": "1240:8:6",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$4738",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:6",
            "typeName": {
              "id": 943,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:6",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 947,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1314:66:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 945,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 946,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_d4a195b4cf9e73a77ea63711a903227f3150e3627941a137d172dc797b82cd84",
                "typeString": "literal_string \"Addresses must not be empty.\""
              },
              "value": "Addresses must not be empty."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 950,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1386:90:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 948,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 949,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_318e95b0e08a378091697c889a887ce37fc37d71fa98e0de98a8e0acdda536f1",
                "typeString": "literal_string \"Addresses and quantities must be the same length.\""
              },
              "value": "Addresses and quantities must be the same length."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 953,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1482:67:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 951,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 952,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_7fd703fbbd234863ddc498f6ccb7e69d3003879a21aabd2ddb6d2773c3639cf0",
                "typeString": "literal_string \"Quantities must not be empty.\""
              },
              "value": "Quantities must not be empty."
            },
            "visibility": "internal"
          },
          {
            "constant": true,
            "id": 956,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1127,
            "src": "1555:69:6",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 954,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:6",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 955,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:6",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_3da6978e12ad268e4eb66f4a79840b60e48f93e78540f7911187ddd7f0f6f2c7",
                "typeString": "literal_string \"Quantity must be greater than zero.\""
              },
              "value": "Quantity must be greater than zero."
            },
            "visibility": "internal"
          },
          {
            "body": {
              "id": 990,
              "nodeType": "Block",
              "src": "1822:515:6",
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
                        "id": 968,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 965,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 959,
                            "src": "1912:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 966,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 967,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 969,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 947,
                        "src": "1952:17:6",
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
                      "id": 964,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "1891:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 970,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 971,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:6"
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
                        "id": 976,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 973,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 962,
                            "src": "2071:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 974,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 975,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:6",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 977,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 953,
                        "src": "2107:17:6",
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
                      "id": 972,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2050:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 978,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 979,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:6"
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
                        "id": 985,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 981,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 959,
                            "src": "2231:15:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 982,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 983,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 962,
                            "src": "2257:11:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 984,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 986,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 950,
                        "src": "2289:20:6",
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
                      "id": 980,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        5400,
                        5401
                      ],
                      "referencedDeclaration": 5401,
                      "src": "2210:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 987,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 988,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:6"
                },
                {
                  "id": 989,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:6"
                }
              ]
            },
            "documentation": null,
            "id": 991,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 963,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 959,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 991,
                  "src": "1775:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 957,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 958,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 962,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 991,
                  "src": "1802:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 960,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 961,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:6"
            },
            "src": "1742:595:6",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1026,
              "nodeType": "Block",
              "src": "2878:246:6",
              "statements": [
                {
                  "body": {
                    "id": 1024,
                    "nodeType": "Block",
                    "src": "3004:114:6",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1016,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 994,
                                "src": "3043:15:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1018,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1017,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1005,
                                "src": "3059:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3043:18:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1019,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 997,
                                "src": "3079:11:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1021,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1020,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1005,
                                "src": "3091:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3079:14:6",
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1015,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1096,
                            "src": "3018:7:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1022,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1023,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1011,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1008,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1005,
                      "src": "2971:1:6",
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
                        "id": 1009,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 994,
                        "src": "2975:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1010,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1025,
                  "initializationExpression": {
                    "assignments": [
                      1005
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1005,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1027,
                        "src": "2959:6:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1004,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1007,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1006,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1013,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1012,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1005,
                        "src": "2999:1:6",
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
                    "id": 1014,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:6"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1027,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1000,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 994,
                    "src": "2844:15:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1001,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 997,
                    "src": "2861:11:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1002,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 999,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 991,
                  "src": "2820:23:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:6"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 998,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 994,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1027,
                  "src": "2735:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 992,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 993,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 997,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1027,
                  "src": "2770:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 995,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 996,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1003,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:6"
            },
            "scope": 1127,
            "src": "2704:420:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1062,
              "nodeType": "Block",
              "src": "3618:248:6",
              "statements": [
                {
                  "body": {
                    "id": 1060,
                    "nodeType": "Block",
                    "src": "3745:115:6",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1052,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1030,
                                "src": "3785:15:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1054,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1053,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1041,
                                "src": "3801:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3785:18:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1055,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1033,
                                "src": "3821:11:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1057,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1056,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1041,
                                "src": "3833:1:6",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_uint256",
                                  "typeString": "uint256"
                                }
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "nodeType": "IndexAccess",
                              "src": "3821:14:6",
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
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1051,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1126,
                            "src": "3759:8:6",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1058,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1059,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:6"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1047,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1044,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1041,
                      "src": "3712:1:6",
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
                        "id": 1045,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1030,
                        "src": "3716:15:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1046,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1061,
                  "initializationExpression": {
                    "assignments": [
                      1041
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1041,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1063,
                        "src": "3700:6:6",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1040,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1043,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1042,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:6",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:6"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1049,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:6",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1048,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1041,
                        "src": "3740:1:6",
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
                    "id": 1050,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:6"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:6"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1063,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1036,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1030,
                    "src": "3584:15:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1037,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1033,
                    "src": "3601:11:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1038,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1035,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 991,
                  "src": "3560:23:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:6"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1034,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1030,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1063,
                  "src": "3475:25:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1028,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1029,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_storage_ptr",
                      "typeString": "address[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 1033,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1063,
                  "src": "3510:18:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1031,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1032,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1039,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:6"
            },
            "scope": 1127,
            "src": "3443:423:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1095,
              "nodeType": "Block",
              "src": "4211:441:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1078,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "4365:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1079,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4365:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1080,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1065,
                        "src": "4389:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1081,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1067,
                        "src": "4416:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1074,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4308:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1075,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2646,
                            "src": "4308:26:6",
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
                          "id": 1073,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2516,
                          "src": "4293:14:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2516_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1076,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2516",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1077,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferToVault",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2515,
                      "src": "4293:58:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1082,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:142:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1083,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:142:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1089,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "4575:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1090,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4575:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1091,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1065,
                        "src": "4599:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1092,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1067,
                        "src": "4626:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1085,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "4522:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1086,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "4522:18:6",
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
                          "id": 1084,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "4515:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1087,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4515:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1088,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2536,
                      "src": "4515:46:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1093,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4515:130:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1094,
                  "nodeType": "ExpressionStatement",
                  "src": "4515:130:6"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1096,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1070,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1067,
                    "src": "4196:9:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1071,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1069,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2588,
                  "src": "4177:18:6",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:6"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1068,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1065,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1096,
                  "src": "4102:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1064,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:6",
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
                  "id": 1067,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1096,
                  "src": "4133:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1066,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1072,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:6"
            },
            "scope": 1127,
            "src": "4076:576:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1125,
              "nodeType": "Block",
              "src": "4960:400:6",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1108,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "5091:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1109,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5091:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1110,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1098,
                        "src": "5115:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1111,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "5142:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1104,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5038:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1105,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "5038:18:6",
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
                          "id": 1103,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "5031:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1106,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5031:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1107,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2545,
                      "src": "5031:46:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1112,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5031:130:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1113,
                  "nodeType": "ExpressionStatement",
                  "src": "5031:130:6"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1119,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1098,
                        "src": "5283:13:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1120,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 5397,
                          "src": "5310:3:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1121,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5310:10:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1122,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1100,
                        "src": "5334:9:6",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1115,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 2667,
                              "src": "5239:5:6",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$2665_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1116,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2648,
                            "src": "5239:18:6",
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
                          "id": 1114,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2555,
                          "src": "5232:6:6",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2555_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1117,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5232:26:6",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2555",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1118,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2527,
                      "src": "5232:37:6",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1123,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5232:121:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1124,
                  "nodeType": "ExpressionStatement",
                  "src": "5232:121:6"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1126,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1101,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1098,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1126,
                  "src": "4889:21:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1097,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4889:7:6",
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
                  "id": 1100,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1126,
                  "src": "4920:14:6",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1099,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4920:4:6",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4879:61:6"
            },
            "payable": false,
            "returnParameters": {
              "id": 1102,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4960:0:6"
            },
            "scope": 1127,
            "src": "4862:498:6",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1128,
        "src": "1113:4249:6"
      }
    ],
    "src": "597:4766:6"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-07T07:45:08.893Z"
}