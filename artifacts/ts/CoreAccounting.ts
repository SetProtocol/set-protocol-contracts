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
  "bytecode": "0x608060405234801561001057600080fd5b50610e87806100206000396000f3006080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd61461011657806330a9073614610140578063430bf08a1461016e57806347e7ef24146101ac578063559ed339146101dd5780638ca4daf914610242578063a003e06914610257578063c19d93fb14610272578063e131243e146102ba578063f3fef3a3146102e6578063f7213db614610317578063fe5b38e41461032f578063fef3ee7314610344575b600080fd5b3480156100e057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610372565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012e60043561039d565b60408051918252519081900360200190f35b34801561014c57600080fd5b5061016c60246004803582810192908201359181359182019101356103af565b005b34801561017a57600080fd5b506101836106b9565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101b857600080fd5b5061016c73ffffffffffffffffffffffffffffffffffffffff600435166024356106d5565b3480156101e957600080fd5b506101f26108d7565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022e578181015183820152602001610216565b505050509050019250505060405180910390f35b34801561024e57600080fd5b50610183610949565b34801561026357600080fd5b5061018360ff60043516610965565b34801561027e57600080fd5b50610287610990565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102c657600080fd5b5061016c60246004803582810192908201359181359182019101356109b3565b3480156102f257600080fd5b5061016c73ffffffffffffffffffffffffffffffffffffffff60043516602435610c78565b34801561032357600080fd5b5061012e600435610dae565b34801561033b57600080fd5b506101f2610dc0565b34801561035057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610e30565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506104e7915050576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156104ac578181015183820152602001610494565b50505050905090810190601f1680156104d95780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e000000602082015290600010610588576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e000000000000000000000000000000918101919091529114610651576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600092505b858310156106b0576106a587878581811061066e57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff16868686818110151561069957fe5b905060200201356106d5565b600190920191610657565b50505050505050565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60408051606081018252602381527f5175616e74697479206d7573742062652067726561746572207468616e207a6560208201527f726f2e00000000000000000000000000000000000000000000000000000000009181019190915281906000821161079d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600154600254604080517fa6c4e46700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301526024820187905233604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b15801561082a57600080fd5b505af115801561083e573d6000803e3d6000fd5b5050600254604080517fbada572600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff888116602483015260448201889052915191909216935063bada57269250606480830192600092919082900301818387803b1580156108c357600080fd5b505af11580156106b0573d6000803e3d6000fd5b6060600060060180548060200260200160405190810160405280929190818152602001828054801561093f57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610914575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e00000000602082015294506000109250610aaf915050576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e000000602082015290600010610b50576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e000000000000000000000000000000918101919091529114610c19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600092505b858310156106b057610c6d878785818110610c3657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff168686868181101515610c6157fe5b90506020020135610c78565b600190920191610c1f565b600254604080517f80ddda3000000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff858116602483015260448201859052915191909216916380ddda3091606480830192600092919082900301818387803b158015610cf957600080fd5b505af1158015610d0d573d6000803e3d6000fd5b5050600254604080517fc3b35a7e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff878116600483015233602483015260448201879052915191909216935063c3b35a7e9250606480830192600092919082900301818387803b158015610d9257600080fd5b505af1158015610da6573d6000803e3d6000fd5b505050505050565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561093f5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610914575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a7230582067bf289bc38ee2ad7521b98308483f6e0085e3a6db915fb9322305e6dae837330029",
  "deployedBytecode": "0x6080604052600436106100cf5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100d45780631e912bd61461011657806330a9073614610140578063430bf08a1461016e57806347e7ef24146101ac578063559ed339146101dd5780638ca4daf914610242578063a003e06914610257578063c19d93fb14610272578063e131243e146102ba578063f3fef3a3146102e6578063f7213db614610317578063fe5b38e41461032f578063fef3ee7314610344575b600080fd5b3480156100e057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610372565b604080519115158252519081900360200190f35b34801561012257600080fd5b5061012e60043561039d565b60408051918252519081900360200190f35b34801561014c57600080fd5b5061016c60246004803582810192908201359181359182019101356103af565b005b34801561017a57600080fd5b506101836106b9565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101b857600080fd5b5061016c73ffffffffffffffffffffffffffffffffffffffff600435166024356106d5565b3480156101e957600080fd5b506101f26108d7565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561022e578181015183820152602001610216565b505050509050019250505060405180910390f35b34801561024e57600080fd5b50610183610949565b34801561026357600080fd5b5061018360ff60043516610965565b34801561027e57600080fd5b50610287610990565b6040805173ffffffffffffffffffffffffffffffffffffffff938416815291909216602082015281519081900390910190f35b3480156102c657600080fd5b5061016c60246004803582810192908201359181359182019101356109b3565b3480156102f257600080fd5b5061016c73ffffffffffffffffffffffffffffffffffffffff60043516602435610c78565b34801561032357600080fd5b5061012e600435610dae565b34801561033b57600080fd5b506101f2610dc0565b34801561035057600080fd5b5061010273ffffffffffffffffffffffffffffffffffffffff60043516610e30565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506104e7915050576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156104ac578181015183820152602001610494565b50505050905090810190601f1680156104d95780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e000000602082015290600010610588576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e000000000000000000000000000000918101919091529114610651576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600092505b858310156106b0576106a587878581811061066e57fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff16868686818110151561069957fe5b905060200201356106d5565b600190920191610657565b50505050505050565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60408051606081018252602381527f5175616e74697479206d7573742062652067726561746572207468616e207a6560208201527f726f2e00000000000000000000000000000000000000000000000000000000009181019190915281906000821161079d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600154600254604080517fa6c4e46700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff87811660048301526024820187905233604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b15801561082a57600080fd5b505af115801561083e573d6000803e3d6000fd5b5050600254604080517fbada572600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff888116602483015260448201889052915191909216935063bada57269250606480830192600092919082900301818387803b1580156108c357600080fd5b505af11580156106b0573d6000803e3d6000fd5b6060600060060180548060200260200160405190810160405280929190818152602001828054801561093f57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610914575b5050505050905090565b60015473ffffffffffffffffffffffffffffffffffffffff1690565b60ff1660009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015460025473ffffffffffffffffffffffffffffffffffffffff918216911682565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e00000000602082015294506000109250610aaf915050576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e000000602082015290600010610b50576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e000000000000000000000000000000918101919091529114610c19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156104ac578181015183820152602001610494565b50600092505b858310156106b057610c6d878785818110610c3657fe5b9050602002013573ffffffffffffffffffffffffffffffffffffffff168686868181101515610c6157fe5b90506020020135610c78565b600190920191610c1f565b600254604080517f80ddda3000000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff858116602483015260448201859052915191909216916380ddda3091606480830192600092919082900301818387803b158015610cf957600080fd5b505af1158015610d0d573d6000803e3d6000fd5b5050600254604080517fc3b35a7e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff878116600483015233602483015260448201879052915191909216935063c3b35a7e9250606480830192600092919082900301818387803b158015610d9257600080fd5b505af1158015610da6573d6000803e3d6000fd5b505050505050565b60009081526007602052604090205490565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561093f5760200282019190600052602060002090815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610914575050505050905090565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090205460ff16905600a165627a7a7230582067bf289bc38ee2ad7521b98308483f6e0085e3a6db915fb9322305e6dae837330029",
  "sourceMap": "1113:4274:9:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1113:4274:9;;;;;;;",
  "deployedSourceMap": "1113:4274:9:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2228:150:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2228:150:23;;;;;;;;;;;;;;;;;;;;;;;;;2924;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2924:150:23;;;;;;;;;;;;;;;;;;;;;2704:420:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2704:420:9;;;;;;;;;;;;;;;;;;;;;;;;;;2099:123:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2099:123:23;;;;;;;;;;;;;;;;;;;;;;;4076:601:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4076:601:9;;;;;;;;;2647:119:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2647:119:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2647:119:23;;;;;;;;;;;;;;;;;1954:139;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:139:23;;;;1801:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1801:147:23;;;;;;;1724:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1724:18:23;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3443:423:9;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3443:423:9;;;;;;;;;;;;;;;;;;;;;;;;4887:498;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4887:498:9;;;;;;;;;2772:146:23;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2772:146:23;;;;;2384:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2384:119:23;;;;2509:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2509:132:23;;;;;;;2228:150;2341:30;;2314:4;2341:30;;;:20;:30;;;;;;;;;2228:150::o;2924:::-;3010:4;3037:30;;;:18;:30;;;;;;;2924:150::o;2704:420:9:-;2959:6;2844:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1742:595:9;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2861:11:9;;-1:-1:-1;2861:11:9;;-1:-1:-1;2861:11:9;;-1:-1:-1;1742:595:9;;;2861:11;;1742:595;2861:11;1742:595;;-1:-1:-1;;1912:22:9;;1952:17;;;;;;;;;;;;;;;;;;-1:-1:-1;1937:1:9;-1:-1:-1;1912:26:9;-1:-1:-1;1891:88:9;;-1:-1:-1;;1891:88:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1891:88:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2071:18:9;;2107:17;;;;;;;;;;;;;;;;;;2092:1;-1:-1:-1;2050:84:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2050:84:9;-1:-1:-1;2257:18:9;;2231:22;;2289:20;;;;;;;;;;;;;;;;;;;;;;;;;2231:44;2210:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2210:109:9;;2968:1;2959:10;;2954:164;2971:26;;;2954:164;;;3018:89;3043:15;;3059:1;3043:18;;;;;;;;;;;;;;;3079:11;;3091:1;3079:14;;;;;;;;;;;;;;;3018:7;:89::i;:::-;2999:3;;;;;2954:164;;;2704:420;;;;;;;:::o;2099:123:23:-;2197:18;;;;2099:123;:::o;4076:601:9:-;1542:13:22;;;;;;;;;;;;;;;;;;;;;;;;4196:9:9;;1527:1:22;1515:13;;1494:71;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1494:71:22;-1:-1:-1;4308:26:9;;4432:18;;4293:167;;;;;;4308:26;4293:167;;;;;;;;;;;;;4408:10;4293:167;;;;4432:18;;;4293:167;;;;;;4308:26;;;;;4293:51;;:167;;;;;4308:5;;4293:167;;;;;;;4308:5;:26;4293:167;;;5:2:-1;;;;30:1;27;20:12;5:2;4293:167:9;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;4547:18:9;;4540:130;;;;;;4600:10;4540:130;;;;4547:18;4540:130;;;;;;;;;;;;;;;4547:18;;;;;-1:-1:-1;4540:46:9;;-1:-1:-1;4540:130:9;;;;;4547:5;;4540:130;;;;;;;4547:5;:18;4540:130;;;5:2:-1;;;;30:1;27;20:12;5:2;4540:130:9;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;2647:119:23;2712:9;2744:5;:15;;2737:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2647:119;:::o;1954:139::-;2060:26;;;;1954:139;:::o;1801:147::-;1913:28;;1883:7;1913:28;;;;;;;;;;;;;;1801:147::o;1724:18::-;;;;;;;;;;;;:::o;3443:423:9:-;3700:6;3584:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1742:595:9;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3601:11:9;;-1:-1:-1;3601:11:9;;-1:-1:-1;3601:11:9;;-1:-1:-1;1742:595:9;;;3601:11;;1742:595;3601:11;1742:595;;-1:-1:-1;;1912:22:9;;1952:17;;;;;;;;;;;;;;;;;;-1:-1:-1;1937:1:9;-1:-1:-1;1912:26:9;-1:-1:-1;1891:88:9;;-1:-1:-1;;1891:88:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1891:88:9;-1:-1:-1;2071:18:9;;2107:17;;;;;;;;;;;;;;;;;;2092:1;-1:-1:-1;2050:84:9;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2050:84:9;-1:-1:-1;2257:18:9;;2231:22;;2289:20;;;;;;;;;;;;;;;;;;;;;;;;;2231:44;2210:109;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2210:109:9;;3709:1;3700:10;;3695:165;3712:26;;;3695:165;;;3759:90;3785:15;;3801:1;3785:18;;;;;;;;;;;;;;;3821:11;;3833:1;3821:14;;;;;;;;;;;;;;;3759:8;:90::i;:::-;3740:3;;;;;3695:165;;4887:498;5063:18;;5056:130;;;;;;5116:10;5056:130;;;;5063:18;5056:130;;;;;;;;;;;;;;;5063:18;;;;;5056:46;;:130;;;;;5063:5;;5056:130;;;;;;;5063:5;:18;5056:130;;;5:2:-1;;;;30:1;27;20:12;5:2;5056:130:9;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5264:18:9;;5257:121;;;;;;5264:18;5257:121;;;;;;;5335:10;5257:121;;;;;;;;;;;;5264:18;;;;;-1:-1:-1;5257:37:9;;-1:-1:-1;5257:121:9;;;;;5264:5;;5257:121;;;;;;;5264:5;:18;5257:121;;;5:2:-1;;;;30:1;27;20:12;5:2;5257:121:9;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5257:121:9;;;;4887:498;;:::o;2772:146:23:-;2856:4;2883:28;;;:16;:28;;;;;;;2772:146::o;2384:119::-;2449:9;2481:5;:15;;2474:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2384:119;:::o;2509:132::-;2613:21;;2586:4;2613:21;;;:15;:21;;;;;;;;;2509:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant ADDRESSES_MISSING = \"Addresses must not be empty.\";\n    string constant BATCH_INPUT_MISMATCH = \"Addresses and quantities must be the same length.\";\n    string constant QUANTITES_MISSING = \"Quantities must not be empty.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n\n    /* ============ Modifiers ============ */\n\n    // Confirm that all inputs are valid for batch transactions\n    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {\n        // Confirm an empty _addresses array is not passed\n        require(\n            _tokenAddresses.length > 0,\n            ADDRESSES_MISSING\n        );\n\n        // Confirm an empty _quantities array is not passed\n        require(\n            _quantities.length > 0,\n            QUANTITES_MISSING\n        );\n\n        // Confirm there is one quantity for every token address\n        require(\n            _tokenAddresses.length == _quantities.length,\n            BATCH_INPUT_MISMATCH\n        );\n        _;\n    }\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run deposit function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            deposit(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run withdraw function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            withdraw(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n        isPositiveQuantity(_quantity)\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxyAddress).transfer(\n            _tokenAddress,\n            _quantity,\n            msg.sender,\n            state.vaultAddress\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vaultAddress).incrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n    {\n        // Call Vault contract to deattribute tokens to user\n        IVault(state.vaultAddress).decrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        IVault(state.vaultAddress).withdrawTo(\n            _tokenAddress,\n            msg.sender,\n            _quantity\n        );\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1608
      ]
    },
    "id": 1609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1406,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1408,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 6347,
        "src": "622:73:9",
        "symbolAliases": [
          {
            "foreign": 1407,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1410,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3455,
        "src": "696:63:9",
        "symbolAliases": [
          {
            "foreign": 1409,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1412,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3594,
        "src": "760:49:9",
        "symbolAliases": [
          {
            "foreign": 1411,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1414,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3333,
        "src": "810:66:9",
        "symbolAliases": [
          {
            "foreign": 1413,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1416,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3372,
        "src": "877:50:9",
        "symbolAliases": [
          {
            "foreign": 1415,
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
              "id": 1417,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1144:9:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1418,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1419,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1159:13:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1420,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:9"
          }
        ],
        "contractDependencies": [
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1608,
        "linearizedBaseContracts": [
          1608,
          3454,
          3593
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1423,
            "libraryName": {
              "contractScope": null,
              "id": 1421,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1240:8:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:9",
            "typeName": {
              "id": 1422,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:9",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1426,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1314:66:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1424,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 1425,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:9",
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
            "id": 1429,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1386:90:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1427,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 1428,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:9",
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
            "id": 1432,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1482:67:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1430,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 1431,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:9",
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
            "id": 1435,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1555:69:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1433,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 1434,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:9",
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
              "id": 1469,
              "nodeType": "Block",
              "src": "1822:515:9",
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
                        "id": 1447,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1444,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1438,
                            "src": "1912:15:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1445,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:9",
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
                          "id": 1446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:9",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1448,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1426,
                        "src": "1952:17:9",
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
                      "id": 1443,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1891:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1449,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1450,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:9"
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
                        "id": 1455,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1452,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1441,
                            "src": "2071:11:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1453,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:9",
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
                          "id": 1454,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:9",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1456,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1432,
                        "src": "2107:17:9",
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
                      "id": 1451,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2050:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1457,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1458,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:9"
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
                        "id": 1464,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1460,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1438,
                            "src": "2231:15:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1461,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:9",
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
                            "id": 1462,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1441,
                            "src": "2257:11:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1463,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1465,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1429,
                        "src": "2289:20:9",
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
                      "id": 1459,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2210:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1466,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1467,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:9"
                },
                {
                  "id": 1468,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:9"
                }
              ]
            },
            "documentation": null,
            "id": 1470,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 1442,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1438,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1470,
                  "src": "1775:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1436,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1437,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:9",
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
                  "id": 1441,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1470,
                  "src": "1802:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1439,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1440,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:9"
            },
            "src": "1742:595:9",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1505,
              "nodeType": "Block",
              "src": "2878:246:9",
              "statements": [
                {
                  "body": {
                    "id": 1503,
                    "nodeType": "Block",
                    "src": "3004:114:9",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1495,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1473,
                                "src": "3043:15:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1497,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1496,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1484,
                                "src": "3059:1:9",
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
                              "src": "3043:18:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1498,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1476,
                                "src": "3079:11:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1500,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1499,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1484,
                                "src": "3091:1:9",
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
                              "src": "3079:14:9",
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
                            "id": 1494,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1577,
                            "src": "3018:7:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1501,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1502,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:9"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1490,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1487,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1484,
                      "src": "2971:1:9",
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
                        "id": 1488,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1473,
                        "src": "2975:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1489,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1504,
                  "initializationExpression": {
                    "assignments": [
                      1484
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1484,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1506,
                        "src": "2959:6:9",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1483,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1486,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:9"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1492,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:9",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1491,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "2999:1:9",
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
                    "id": 1493,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:9"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:9"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1506,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1479,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1473,
                    "src": "2844:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1480,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1476,
                    "src": "2861:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1481,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1478,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1470,
                  "src": "2820:23:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:9"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1477,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1473,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1506,
                  "src": "2735:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1471,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1472,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:9",
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
                  "id": 1476,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1506,
                  "src": "2770:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1474,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1475,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1482,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:9"
            },
            "scope": 1608,
            "src": "2704:420:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1541,
              "nodeType": "Block",
              "src": "3618:248:9",
              "statements": [
                {
                  "body": {
                    "id": 1539,
                    "nodeType": "Block",
                    "src": "3745:115:9",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1531,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1509,
                                "src": "3785:15:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1533,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1532,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1520,
                                "src": "3801:1:9",
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
                              "src": "3785:18:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1534,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1512,
                                "src": "3821:11:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1536,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1535,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1520,
                                "src": "3833:1:9",
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
                              "src": "3821:14:9",
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
                            "id": 1530,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1607,
                            "src": "3759:8:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1537,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1538,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:9"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1523,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1520,
                      "src": "3712:1:9",
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
                        "id": 1524,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1509,
                        "src": "3716:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1525,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1540,
                  "initializationExpression": {
                    "assignments": [
                      1520
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1520,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1542,
                        "src": "3700:6:9",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1519,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1522,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1521,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:9"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1528,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:9",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1527,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "3740:1:9",
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
                    "id": 1529,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:9"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:9"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1542,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1515,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1509,
                    "src": "3584:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1516,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1512,
                    "src": "3601:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1517,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1514,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1470,
                  "src": "3560:23:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:9"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1513,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1509,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1542,
                  "src": "3475:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1507,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1508,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:9",
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
                  "id": 1512,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1542,
                  "src": "3510:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1510,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1511,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:9"
            },
            "scope": 1608,
            "src": "3443:423:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1576,
              "nodeType": "Block",
              "src": "4211:466:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1557,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1544,
                        "src": "4358:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1558,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1546,
                        "src": "4385:9:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1559,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "4408:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1560,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4408:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1561,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "4432:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1562,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vaultAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3464,
                        "src": "4432:18:9",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
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
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1553,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "4308:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1554,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "4308:26:9",
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
                          "id": 1552,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "4293:14:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1555,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1556,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "4293:51:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1563,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:167:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1564,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:167:9"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1570,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "4600:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1571,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4600:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1572,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1544,
                        "src": "4624:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1573,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1546,
                        "src": "4651:9:9",
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
                              "id": 1566,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "4547:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1567,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "4547:18:9",
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
                          "id": 1565,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "4540:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1568,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4540:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1569,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3352,
                      "src": "4540:46:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1574,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4540:130:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1575,
                  "nodeType": "ExpressionStatement",
                  "src": "4540:130:9"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1577,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1549,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1546,
                    "src": "4196:9:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1550,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1548,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "4177:18:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:9"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1544,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1577,
                  "src": "4102:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1543,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:9",
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
                  "id": 1546,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1577,
                  "src": "4133:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1545,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1551,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:9"
            },
            "scope": 1608,
            "src": "4076:601:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1606,
              "nodeType": "Block",
              "src": "4985:400:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1589,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5116:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1590,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5116:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1591,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1579,
                        "src": "5140:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1592,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
                        "src": "5167:9:9",
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
                              "id": 1585,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "5063:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1586,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "5063:18:9",
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
                          "id": 1584,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "5056:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1587,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5056:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3361,
                      "src": "5056:46:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1593,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5056:130:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1594,
                  "nodeType": "ExpressionStatement",
                  "src": "5056:130:9"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1600,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1579,
                        "src": "5308:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1601,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5335:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1602,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5335:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1603,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
                        "src": "5359:9:9",
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
                              "id": 1596,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "5264:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1597,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "5264:18:9",
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
                          "id": 1595,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "5257:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1598,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5257:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3343,
                      "src": "5257:37:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5257:121:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1605,
                  "nodeType": "ExpressionStatement",
                  "src": "5257:121:9"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1582,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1579,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1607,
                  "src": "4914:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4914:7:9",
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
                  "id": 1581,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1607,
                  "src": "4945:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1580,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4945:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4904:61:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1583,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4985:0:9"
            },
            "scope": 1608,
            "src": "4887:498:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1609,
        "src": "1113:4274:9"
      }
    ],
    "src": "597:4791:9"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1608
      ]
    },
    "id": 1609,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1406,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:9"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1408,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 6347,
        "src": "622:73:9",
        "symbolAliases": [
          {
            "foreign": 1407,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1410,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3455,
        "src": "696:63:9",
        "symbolAliases": [
          {
            "foreign": 1409,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1412,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3594,
        "src": "760:49:9",
        "symbolAliases": [
          {
            "foreign": 1411,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1414,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3333,
        "src": "810:66:9",
        "symbolAliases": [
          {
            "foreign": 1413,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1416,
        "nodeType": "ImportDirective",
        "scope": 1609,
        "sourceUnit": 3372,
        "src": "877:50:9",
        "symbolAliases": [
          {
            "foreign": 1415,
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
              "id": 1417,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3593,
              "src": "1144:9:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3593",
                "typeString": "contract CoreState"
              }
            },
            "id": 1418,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:9"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1419,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3454,
              "src": "1159:13:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$3454",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1420,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:9"
          }
        ],
        "contractDependencies": [
          3454,
          3593
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1608,
        "linearizedBaseContracts": [
          1608,
          3454,
          3593
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1423,
            "libraryName": {
              "contractScope": null,
              "id": 1421,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1240:8:9",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:9",
            "typeName": {
              "id": 1422,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:9",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1426,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1314:66:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1424,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 1425,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:9",
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
            "id": 1429,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1386:90:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1427,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 1428,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:9",
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
            "id": 1432,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1482:67:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1430,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 1431,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:9",
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
            "id": 1435,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1608,
            "src": "1555:69:9",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1433,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:9",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 1434,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:9",
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
              "id": 1469,
              "nodeType": "Block",
              "src": "1822:515:9",
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
                        "id": 1447,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1444,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1438,
                            "src": "1912:15:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1445,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:9",
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
                          "id": 1446,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:9",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1448,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1426,
                        "src": "1952:17:9",
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
                      "id": 1443,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "1891:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1449,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1450,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:9"
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
                        "id": 1455,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1452,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1441,
                            "src": "2071:11:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1453,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:9",
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
                          "id": 1454,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:9",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1456,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1432,
                        "src": "2107:17:9",
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
                      "id": 1451,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2050:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1457,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1458,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:9"
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
                        "id": 1464,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1460,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1438,
                            "src": "2231:15:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1461,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:9",
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
                            "id": 1462,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1441,
                            "src": "2257:11:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1463,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1465,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1429,
                        "src": "2289:20:9",
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
                      "id": 1459,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6903,
                      "src": "2210:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1466,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1467,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:9"
                },
                {
                  "id": 1468,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:9"
                }
              ]
            },
            "documentation": null,
            "id": 1470,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 1442,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1438,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1470,
                  "src": "1775:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1436,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1437,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:9",
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
                  "id": 1441,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1470,
                  "src": "1802:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1439,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1440,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:9"
            },
            "src": "1742:595:9",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1505,
              "nodeType": "Block",
              "src": "2878:246:9",
              "statements": [
                {
                  "body": {
                    "id": 1503,
                    "nodeType": "Block",
                    "src": "3004:114:9",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1495,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1473,
                                "src": "3043:15:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1497,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1496,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1484,
                                "src": "3059:1:9",
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
                              "src": "3043:18:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1498,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1476,
                                "src": "3079:11:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1500,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1499,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1484,
                                "src": "3091:1:9",
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
                              "src": "3079:14:9",
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
                            "id": 1494,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1577,
                            "src": "3018:7:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1501,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1502,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:9"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1490,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1487,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1484,
                      "src": "2971:1:9",
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
                        "id": 1488,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1473,
                        "src": "2975:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1489,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1504,
                  "initializationExpression": {
                    "assignments": [
                      1484
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1484,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1506,
                        "src": "2959:6:9",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1483,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1486,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1485,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:9"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1492,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:9",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1491,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "2999:1:9",
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
                    "id": 1493,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:9"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:9"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1506,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1479,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1473,
                    "src": "2844:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1480,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1476,
                    "src": "2861:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1481,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1478,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1470,
                  "src": "2820:23:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:9"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1477,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1473,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1506,
                  "src": "2735:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1471,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1472,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:9",
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
                  "id": 1476,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1506,
                  "src": "2770:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1474,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1475,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1482,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:9"
            },
            "scope": 1608,
            "src": "2704:420:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1541,
              "nodeType": "Block",
              "src": "3618:248:9",
              "statements": [
                {
                  "body": {
                    "id": 1539,
                    "nodeType": "Block",
                    "src": "3745:115:9",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1531,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1509,
                                "src": "3785:15:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1533,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1532,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1520,
                                "src": "3801:1:9",
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
                              "src": "3785:18:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1534,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1512,
                                "src": "3821:11:9",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1536,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1535,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1520,
                                "src": "3833:1:9",
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
                              "src": "3821:14:9",
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
                            "id": 1530,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1607,
                            "src": "3759:8:9",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1537,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1538,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:9"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1526,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1523,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1520,
                      "src": "3712:1:9",
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
                        "id": 1524,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1509,
                        "src": "3716:15:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1525,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1540,
                  "initializationExpression": {
                    "assignments": [
                      1520
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1520,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1542,
                        "src": "3700:6:9",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1519,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1522,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1521,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:9",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:9"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1528,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:9",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1527,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "3740:1:9",
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
                    "id": 1529,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:9"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:9"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1542,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1515,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1509,
                    "src": "3584:15:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1516,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1512,
                    "src": "3601:11:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1517,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1514,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1470,
                  "src": "3560:23:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:9"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1513,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1509,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1542,
                  "src": "3475:25:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1507,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1508,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:9",
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
                  "id": 1512,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1542,
                  "src": "3510:18:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1510,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1511,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:9"
            },
            "scope": 1608,
            "src": "3443:423:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1576,
              "nodeType": "Block",
              "src": "4211:466:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1557,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1544,
                        "src": "4358:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1558,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1546,
                        "src": "4385:9:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1559,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "4408:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1560,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4408:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1561,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3489,
                          "src": "4432:5:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3487_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1562,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vaultAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3464,
                        "src": "4432:18:9",
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
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
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
                        "arguments": [
                          {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 1553,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "4308:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1554,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3462,
                            "src": "4308:26:9",
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
                          "id": 1552,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3332,
                          "src": "4293:14:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3332_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1555,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3332",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1556,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3331,
                      "src": "4293:51:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1563,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:167:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1564,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:167:9"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1570,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "4600:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1571,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4600:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1572,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1544,
                        "src": "4624:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1573,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1546,
                        "src": "4651:9:9",
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
                              "id": 1566,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "4547:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1567,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "4547:18:9",
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
                          "id": 1565,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "4540:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1568,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4540:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1569,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3352,
                      "src": "4540:46:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1574,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4540:130:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1575,
                  "nodeType": "ExpressionStatement",
                  "src": "4540:130:9"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1577,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1549,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1546,
                    "src": "4196:9:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1550,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1548,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 3404,
                  "src": "4177:18:9",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:9"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1547,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1544,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1577,
                  "src": "4102:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1543,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:9",
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
                  "id": 1546,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1577,
                  "src": "4133:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1545,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1551,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:9"
            },
            "scope": 1608,
            "src": "4076:601:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1606,
              "nodeType": "Block",
              "src": "4985:400:9",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1589,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5116:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1590,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5116:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1591,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1579,
                        "src": "5140:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1592,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
                        "src": "5167:9:9",
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
                              "id": 1585,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "5063:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1586,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "5063:18:9",
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
                          "id": 1584,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "5056:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1587,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5056:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1588,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3361,
                      "src": "5056:46:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1593,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5056:130:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1594,
                  "nodeType": "ExpressionStatement",
                  "src": "5056:130:9"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1600,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1579,
                        "src": "5308:13:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1601,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6899,
                          "src": "5335:3:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1602,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5335:10:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1603,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
                        "src": "5359:9:9",
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
                              "id": 1596,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3489,
                              "src": "5264:5:9",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3487_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1597,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3464,
                            "src": "5264:18:9",
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
                          "id": 1595,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3371,
                          "src": "5257:6:9",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3371_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1598,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5257:26:9",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3371",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1599,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3343,
                      "src": "5257:37:9",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1604,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5257:121:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1605,
                  "nodeType": "ExpressionStatement",
                  "src": "5257:121:9"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1607,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1582,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1579,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1607,
                  "src": "4914:21:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1578,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4914:7:9",
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
                  "id": 1581,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1607,
                  "src": "4945:14:9",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1580,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4945:4:9",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4904:61:9"
            },
            "payable": false,
            "returnParameters": {
              "id": 1583,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4985:0:9"
            },
            "scope": 1608,
            "src": "4887:498:9",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1609,
        "src": "1113:4274:9"
      }
    ],
    "src": "597:4791:9"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.178Z"
}