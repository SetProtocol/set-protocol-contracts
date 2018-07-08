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
  "bytecode": "0x608060405234801561001057600080fd5b50610b8a806100206000396000f3006080604052600436106100b95763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100be5780631e912bd6146100f357806330a907361461011d578063430bf08a1461014b57806347e7ef241461017c5780638ca4daf9146101a0578063a003e069146101b5578063c19d93fb146101d0578063e131243e1461020b578063f3fef3a314610237578063f7213db61461025b578063fef3ee7314610273575b600080fd5b3480156100ca57600080fd5b506100df600160a060020a0360043516610294565b604080519115158252519081900360200190f35b3480156100ff57600080fd5b5061010b6004356102b2565b60408051918252519081900360200190f35b34801561012957600080fd5b5061014960246004803582810192908201359181359182019101356102c4565b005b34801561015757600080fd5b5061016061057c565b60408051600160a060020a039092168252519081900360200190f35b34801561018857600080fd5b50610149600160a060020a036004351660243561058b565b3480156101ac57600080fd5b5061016061075c565b3480156101c157600080fd5b5061016060ff6004351661076b565b3480156101dc57600080fd5b506101e5610789565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561021757600080fd5b50610149602460048035828101929082013591813591820191013561079f565b34801561024357600080fd5b50610149600160a060020a0360043516602435610a12565b34801561026757600080fd5b5061010b600435610b2e565b34801561027f57600080fd5b506100df600160a060020a0360043516610b40565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506103e59150505760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103aa578181015183820152602001610392565b50505050905090810190601f1680156103d75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e00000060208201529060001061046f5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e0000000000000000000000000000009181019190915291146105215760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600092505b858310156105735761056887878581811061053e57fe5b90506020020135600160a060020a0316868686818110151561055c57fe5b9050602002013561058b565b600190920191610527565b50505050505050565b600254600160a060020a031690565b60408051606081018252602381527f5175616e74697479206d7573742062652067726561746572207468616e207a6560208201527f726f2e00000000000000000000000000000000000000000000000000000000009181019190915281906000821161063c5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a0387811660048301526024820187905233604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156106bc57600080fd5b505af11580156106d0573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a03888116602483015260448201889052915191909216935063bada57269250606480830192600092919082900301818387803b15801561074857600080fd5b505af1158015610573573d6000803e3d6000fd5b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506108849150505760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e00000060208201529060001061090e5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e0000000000000000000000000000009181019190915291146109c05760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600092505b8583101561057357610a078787858181106109dd57fe5b90506020020135600160a060020a031686868681811015156109fb57fe5b90506020020135610a12565b6001909201916109c6565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a03858116602483015260448201859052915191909216916380ddda3091606480830192600092919082900301818387803b158015610a8657600080fd5b505af1158015610a9a573d6000803e3d6000fd5b5050600254604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a03878116600483015233602483015260448201879052915191909216935063c3b35a7e9250606480830192600092919082900301818387803b158015610b1257600080fd5b505af1158015610b26573d6000803e3d6000fd5b505050505050565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820e20f6cf326c43adf1b4f946b46a940faefc7f5fdf6be022e161a0b223c5a46760029",
  "deployedBytecode": "0x6080604052600436106100b95763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100be5780631e912bd6146100f357806330a907361461011d578063430bf08a1461014b57806347e7ef241461017c5780638ca4daf9146101a0578063a003e069146101b5578063c19d93fb146101d0578063e131243e1461020b578063f3fef3a314610237578063f7213db61461025b578063fef3ee7314610273575b600080fd5b3480156100ca57600080fd5b506100df600160a060020a0360043516610294565b604080519115158252519081900360200190f35b3480156100ff57600080fd5b5061010b6004356102b2565b60408051918252519081900360200190f35b34801561012957600080fd5b5061014960246004803582810192908201359181359182019101356102c4565b005b34801561015757600080fd5b5061016061057c565b60408051600160a060020a039092168252519081900360200190f35b34801561018857600080fd5b50610149600160a060020a036004351660243561058b565b3480156101ac57600080fd5b5061016061075c565b3480156101c157600080fd5b5061016060ff6004351661076b565b3480156101dc57600080fd5b506101e5610789565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b34801561021757600080fd5b50610149602460048035828101929082013591813591820191013561079f565b34801561024357600080fd5b50610149600160a060020a0360043516602435610a12565b34801561026757600080fd5b5061010b600435610b2e565b34801561027f57600080fd5b506100df600160a060020a0360043516610b40565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526006602052604090205490565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506103e59150505760405160e560020a62461bcd0281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103aa578181015183820152602001610392565b50505050905090810190601f1680156103d75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e00000060208201529060001061046f5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e0000000000000000000000000000009181019190915291146105215760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600092505b858310156105735761056887878581811061053e57fe5b90506020020135600160a060020a0316868686818110151561055c57fe5b9050602002013561058b565b600190920191610527565b50505050505050565b600254600160a060020a031690565b60408051606081018252602381527f5175616e74697479206d7573742062652067726561746572207468616e207a6560208201527f726f2e00000000000000000000000000000000000000000000000000000000009181019190915281906000821161063c5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a0387811660048301526024820187905233604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156106bc57600080fd5b505af11580156106d0573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a03888116602483015260448201889052915191909216935063bada57269250606480830192600092919082900301818387803b15801561074857600080fd5b505af1158015610573573d6000803e3d6000fd5b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60008484808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808a0282810182019093528982529095508994508893508392508501908490808284375050855160408051808201909152601c81527f416464726573736573206d757374206e6f7420626520656d7074792e000000006020820152945060001092506108849150505760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50805160408051808201909152601d81527f5175616e746974696573206d757374206e6f7420626520656d7074792e00000060208201529060001061090e5760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b508051825160408051606081018252603181527f41646472657373657320616e64207175616e746974696573206d75737420626560208201527f207468652073616d65206c656e6774682e0000000000000000000000000000009181019190915291146109c05760405160e560020a62461bcd028152600401808060200182810382528381815181526020019150805190602001908083836000838110156103aa578181015183820152602001610392565b50600092505b8583101561057357610a078787858181106109dd57fe5b90506020020135600160a060020a031686868681811015156109fb57fe5b90506020020135610a12565b6001909201916109c6565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152336004820152600160a060020a03858116602483015260448201859052915191909216916380ddda3091606480830192600092919082900301818387803b158015610a8657600080fd5b505af1158015610a9a573d6000803e3d6000fd5b5050600254604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a03878116600483015233602483015260448201879052915191909216935063c3b35a7e9250606480830192600092919082900301818387803b158015610b1257600080fd5b505af1158015610b26573d6000803e3d6000fd5b505050505050565b60009081526005602052604090205490565b600160a060020a031660009081526004602052604090205460ff16905600a165627a7a72305820e20f6cf326c43adf1b4f946b46a940faefc7f5fdf6be022e161a0b223c5a46760029",
  "sourceMap": "1113:4274:8:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1113:4274:8;;;;;;;",
  "deployedSourceMap": "1113:4274:8:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2083:150:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2083:150:22;-1:-1:-1;;;;;2083:150:22;;;;;;;;;;;;;;;;;;;;;;;2529;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2529:150:22;;;;;;;;;;;;;;;;;;;;;2704:420:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2704:420:8;;;;;;;;;;;;;;;;;;;;;;;;;;1954:123:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1954:123:22;;;;;;;;-1:-1:-1;;;;;1954:123:22;;;;;;;;;;;;;;4076:601:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4076:601:8;-1:-1:-1;;;;;4076:601:8;;;;;;;1809:139:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1809:139:22;;;;1656:147;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1656:147:22;;;;;;;1579:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1579:18:22;;;;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;;;;;;;;;;;;;;;;;;;3443:423:8;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3443:423:8;;;;;;;;;;;;;;;;;;;;;;;;4887:498;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4887:498:8;-1:-1:-1;;;;;4887:498:8;;;;;;;2377:146:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2377:146:22;;;;;2239:132;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2239:132:22;-1:-1:-1;;;;;2239:132:22;;;;;2083:150;-1:-1:-1;;;;;2196:30:22;2169:4;2196:30;;;:20;:30;;;;;;;;;2083:150::o;2529:::-;2615:4;2642:30;;;:18;:30;;;;;;;2529:150::o;2704:420:8:-;2959:6;2844:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1742:595:8;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2861:11:8;;-1:-1:-1;2861:11:8;;-1:-1:-1;2861:11:8;;-1:-1:-1;1742:595:8;;;2861:11;;1742:595;2861:11;1742:595;;-1:-1:-1;;1912:22:8;;1952:17;;;;;;;;;;;;;;;;;;-1:-1:-1;1937:1:8;-1:-1:-1;1912:26:8;-1:-1:-1;1891:88:8;;-1:-1:-1;;1891:88:8;;;-1:-1:-1;;;;;1891:88:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1891:88:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2071:18:8;;2107:17;;;;;;;;;;;;;;;;;;2092:1;-1:-1:-1;2050:84:8;;;;-1:-1:-1;;;;;2050:84:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2050:84:8;-1:-1:-1;2257:18:8;;2231:22;;2289:20;;;;;;;;;;;;;;;;;;;;;;;;;2231:44;2210:109;;;;-1:-1:-1;;;;;2210:109:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2210:109:8;;2968:1;2959:10;;2954:164;2971:26;;;2954:164;;;3018:89;3043:15;;3059:1;3043:18;;;;;;;;;;;;;-1:-1:-1;;;;;3043:18:8;3079:11;;3091:1;3079:14;;;;;;;;;;;;;;;3018:7;:89::i;:::-;2999:3;;;;;2954:164;;;2704:420;;;;;;;:::o;1954:123:22:-;2052:18;;-1:-1:-1;;;;;2052:18:22;1954:123;:::o;4076:601:8:-;1542:13:21;;;;;;;;;;;;;;;;;;;;;;;;4196:9:8;;1527:1:21;1515:13;;1494:71;;;;-1:-1:-1;;;;;1494:71:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1494:71:21;-1:-1:-1;4308:26:8;;4432:18;;4293:167;;;;;;-1:-1:-1;;;;;4293:167:8;;;;;;;;;;;;;4408:10;4293:167;;;;4432:18;;;4293:167;;;;;;4308:26;;;;;4293:51;;:167;;;;;4308:5;;4293:167;;;;;;;4308:5;:26;4293:167;;;5:2:-1;;;;30:1;27;20:12;5:2;4293:167:8;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;4547:18:8;;4540:130;;;;;;4600:10;4540:130;;;;-1:-1:-1;;;;;4540:130:8;;;;;;;;;;;;;;;4547:18;;;;;-1:-1:-1;4540:46:8;;-1:-1:-1;4540:130:8;;;;;4547:5;;4540:130;;;;;;;4547:5;:18;4540:130;;;5:2:-1;;;;30:1;27;20:12;5:2;4540:130:8;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;1809:139:22;1915:26;;-1:-1:-1;;;;;1915:26:22;1809:139;:::o;1656:147::-;1768:28;;1738:7;1768:28;;;;;;;;;;;-1:-1:-1;;;;;1768:28:22;;1656:147::o;1579:18::-;;;;;-1:-1:-1;;;;;1579:18:22;;;;;;:::o;3443:423:8:-;3700:6;3584:15;;1742:595;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;1742:595:8;;;;;;;;;;;;;;;;;;;;-1:-1:-1;3601:11:8;;-1:-1:-1;3601:11:8;;-1:-1:-1;3601:11:8;;-1:-1:-1;1742:595:8;;;3601:11;;1742:595;3601:11;1742:595;;-1:-1:-1;;1912:22:8;;1952:17;;;;;;;;;;;;;;;;;;-1:-1:-1;1937:1:8;-1:-1:-1;1912:26:8;-1:-1:-1;1891:88:8;;-1:-1:-1;;1891:88:8;;;-1:-1:-1;;;;;1891:88:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1891:88:8;-1:-1:-1;2071:18:8;;2107:17;;;;;;;;;;;;;;;;;;2092:1;-1:-1:-1;2050:84:8;;;;-1:-1:-1;;;;;2050:84:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2050:84:8;-1:-1:-1;2257:18:8;;2231:22;;2289:20;;;;;;;;;;;;;;;;;;;;;;;;;2231:44;2210:109;;;;-1:-1:-1;;;;;2210:109:8;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2210:109:8;;3709:1;3700:10;;3695:165;3712:26;;;3695:165;;;3759:90;3785:15;;3801:1;3785:18;;;;;;;;;;;;;-1:-1:-1;;;;;3785:18:8;3821:11;;3833:1;3821:14;;;;;;;;;;;;;;;3759:8;:90::i;:::-;3740:3;;;;;3695:165;;4887:498;5063:18;;5056:130;;;;;;5116:10;5056:130;;;;-1:-1:-1;;;;;5056:130:8;;;;;;;;;;;;;;;5063:18;;;;;5056:46;;:130;;;;;5063:5;;5056:130;;;;;;;5063:5;:18;5056:130;;;5:2:-1;;;;30:1;27;20:12;5:2;5056:130:8;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5264:18:8;;5257:121;;;;;;-1:-1:-1;;;;;5257:121:8;;;;;;;5335:10;5257:121;;;;;;;;;;;;5264:18;;;;;-1:-1:-1;5257:37:8;;-1:-1:-1;5257:121:8;;;;;5264:5;;5257:121;;;;;;;5264:5;:18;5257:121;;;5:2:-1;;;;30:1;27;20:12;5:2;5257:121:8;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5257:121:8;;;;4887:498;;:::o;2377:146:22:-;2461:4;2488:28;;;:16;:28;;;;;;;2377:146::o;2239:132::-;-1:-1:-1;;;;;2343:21:22;2316:4;2343:21;;;:15;:21;;;;;;;;;2239:132::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreModifiers } from \"../lib/CoreSharedModifiers.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState,\n    CoreModifiers\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ Constants ============ */\n\n    string constant ADDRESSES_MISSING = \"Addresses must not be empty.\";\n    string constant BATCH_INPUT_MISMATCH = \"Addresses and quantities must be the same length.\";\n    string constant QUANTITES_MISSING = \"Quantities must not be empty.\";\n    string constant ZERO_QUANTITY = \"Quantity must be greater than zero.\";\n\n    /* ============ Modifiers ============ */\n\n    // Confirm that all inputs are valid for batch transactions\n    modifier isValidBatchTransaction(address[] _tokenAddresses, uint[] _quantities) {\n        // Confirm an empty _addresses array is not passed\n        require(\n            _tokenAddresses.length > 0,\n            ADDRESSES_MISSING\n        );\n\n        // Confirm an empty _quantities array is not passed\n        require(\n            _quantities.length > 0,\n            QUANTITES_MISSING\n        );\n\n        // Confirm there is one quantity for every token address\n        require(\n            _tokenAddresses.length == _quantities.length,\n            BATCH_INPUT_MISMATCH\n        );\n        _;\n    }\n\n    /* ============ Public Functions ============ */\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run deposit function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            deposit(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokenAddresses,\n        uint[] _quantities\n    )\n        external\n        isValidBatchTransaction(_tokenAddresses, _quantities)\n    {\n        // For each token and quantity pair, run withdraw function\n        for (uint i = 0; i < _tokenAddresses.length; i++) {\n            withdraw(\n                _tokenAddresses[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n        isPositiveQuantity(_quantity)\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxyAddress).transfer(\n            _tokenAddress,\n            _quantity,\n            msg.sender,\n            state.vaultAddress\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vaultAddress).incrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _tokenAddress    The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _tokenAddress,\n        uint _quantity\n    )\n        public\n    {\n        // Call Vault contract to deattribute tokens to user\n        IVault(state.vaultAddress).decrementTokenOwner(\n            msg.sender,\n            _tokenAddress,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        IVault(state.vaultAddress).withdrawTo(\n            _tokenAddress,\n            msg.sender,\n            _quantity\n        );\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1492
      ]
    },
    "id": 1493,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1290,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1292,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 5804,
        "src": "622:73:8",
        "symbolAliases": [
          {
            "foreign": 1291,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1294,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2976,
        "src": "696:63:8",
        "symbolAliases": [
          {
            "foreign": 1293,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1296,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 3089,
        "src": "760:49:8",
        "symbolAliases": [
          {
            "foreign": 1295,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1298,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2854,
        "src": "810:66:8",
        "symbolAliases": [
          {
            "foreign": 1297,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1300,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2893,
        "src": "877:50:8",
        "symbolAliases": [
          {
            "foreign": 1299,
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
              "id": 1301,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1144:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1302,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1303,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1159:13:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1304,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:8"
          }
        ],
        "contractDependencies": [
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1492,
        "linearizedBaseContracts": [
          1492,
          2975,
          3088
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1307,
            "libraryName": {
              "contractScope": null,
              "id": 1305,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1240:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:8",
            "typeName": {
              "id": 1306,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1310,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1314:66:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1308,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 1309,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:8",
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
            "id": 1313,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1386:90:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1311,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 1312,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:8",
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
            "id": 1316,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1482:67:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1314,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 1315,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:8",
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
            "id": 1319,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1555:69:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1317,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 1318,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:8",
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
              "id": 1353,
              "nodeType": "Block",
              "src": "1822:515:8",
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
                        "id": 1331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1328,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1322,
                            "src": "1912:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:8",
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
                          "id": 1330,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1332,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1310,
                        "src": "1952:17:8",
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
                      "id": 1327,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1891:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1334,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:8"
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
                        "id": 1339,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1336,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1325,
                            "src": "2071:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1337,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:8",
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
                          "id": 1338,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1340,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1316,
                        "src": "2107:17:8",
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
                      "id": 1335,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2050:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1341,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1342,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:8"
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
                        "id": 1348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1344,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1322,
                            "src": "2231:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1345,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:8",
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
                            "id": 1346,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1325,
                            "src": "2257:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1347,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1349,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1313,
                        "src": "2289:20:8",
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
                      "id": 1343,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2210:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1351,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:8"
                },
                {
                  "id": 1352,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:8"
                }
              ]
            },
            "documentation": null,
            "id": 1354,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 1326,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1354,
                  "src": "1775:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1320,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1321,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:8",
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
                  "id": 1325,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1354,
                  "src": "1802:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1323,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1324,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:8"
            },
            "src": "1742:595:8",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1389,
              "nodeType": "Block",
              "src": "2878:246:8",
              "statements": [
                {
                  "body": {
                    "id": 1387,
                    "nodeType": "Block",
                    "src": "3004:114:8",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1379,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1357,
                                "src": "3043:15:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1381,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1380,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1368,
                                "src": "3059:1:8",
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
                              "src": "3043:18:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1382,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1360,
                                "src": "3079:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1384,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1383,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1368,
                                "src": "3091:1:8",
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
                              "src": "3079:14:8",
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
                            "id": 1378,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1461,
                            "src": "3018:7:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1385,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1386,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:8"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1374,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1371,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1368,
                      "src": "2971:1:8",
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
                        "id": 1372,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1357,
                        "src": "2975:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1373,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1388,
                  "initializationExpression": {
                    "assignments": [
                      1368
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1368,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1390,
                        "src": "2959:6:8",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1367,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1370,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1369,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:8"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1376,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:8",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1375,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1368,
                        "src": "2999:1:8",
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
                    "id": 1377,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:8"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:8"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1390,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1363,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1357,
                    "src": "2844:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1364,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1360,
                    "src": "2861:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1365,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1362,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1354,
                  "src": "2820:23:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:8"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1361,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1357,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1390,
                  "src": "2735:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1355,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1356,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:8",
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
                  "id": 1360,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1390,
                  "src": "2770:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1358,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1359,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1366,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:8"
            },
            "scope": 1492,
            "src": "2704:420:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1425,
              "nodeType": "Block",
              "src": "3618:248:8",
              "statements": [
                {
                  "body": {
                    "id": 1423,
                    "nodeType": "Block",
                    "src": "3745:115:8",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1415,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1393,
                                "src": "3785:15:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1417,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1416,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3801:1:8",
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
                              "src": "3785:18:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1418,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1396,
                                "src": "3821:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1420,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1419,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3833:1:8",
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
                              "src": "3821:14:8",
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
                            "id": 1414,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1491,
                            "src": "3759:8:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1421,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1422,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:8"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1410,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1407,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1404,
                      "src": "3712:1:8",
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
                        "id": 1408,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1393,
                        "src": "3716:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1409,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1424,
                  "initializationExpression": {
                    "assignments": [
                      1404
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1404,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1426,
                        "src": "3700:6:8",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1403,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1406,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:8"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1412,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:8",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1411,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "3740:1:8",
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
                    "id": 1413,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:8"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:8"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1426,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1399,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1393,
                    "src": "3584:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1400,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1396,
                    "src": "3601:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1398,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1354,
                  "src": "3560:23:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:8"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1393,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1426,
                  "src": "3475:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1391,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1392,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:8",
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
                  "id": 1396,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1426,
                  "src": "3510:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1394,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1395,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:8"
            },
            "scope": 1492,
            "src": "3443:423:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1460,
              "nodeType": "Block",
              "src": "4211:466:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1441,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1428,
                        "src": "4358:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1442,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1430,
                        "src": "4385:9:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1443,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "4408:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1444,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4408:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1445,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "4432:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1446,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vaultAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2985,
                        "src": "4432:18:8",
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
                              "id": 1437,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4308:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1438,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2983,
                            "src": "4308:26:8",
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
                          "id": 1436,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2853,
                          "src": "4293:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2853_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1439,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2853",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1440,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2852,
                      "src": "4293:51:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1447,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:167:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1448,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:167:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1454,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "4600:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1455,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4600:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1456,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1428,
                        "src": "4624:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1457,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1430,
                        "src": "4651:9:8",
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
                              "id": 1450,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4547:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1451,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "4547:18:8",
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
                          "id": 1449,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "4540:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1452,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4540:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1453,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2873,
                      "src": "4540:46:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1458,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4540:130:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1459,
                  "nodeType": "ExpressionStatement",
                  "src": "4540:130:8"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1461,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1433,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1430,
                    "src": "4196:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1434,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1432,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "4177:18:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:8"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1431,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1428,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1461,
                  "src": "4102:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1427,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:8",
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
                  "id": 1430,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1461,
                  "src": "4133:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1429,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1435,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:8"
            },
            "scope": 1492,
            "src": "4076:601:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1490,
              "nodeType": "Block",
              "src": "4985:400:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1473,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5116:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1474,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5116:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1475,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1463,
                        "src": "5140:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1476,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1465,
                        "src": "5167:9:8",
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
                              "id": 1469,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "5063:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1470,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "5063:18:8",
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
                          "id": 1468,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "5056:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1471,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5056:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1472,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2882,
                      "src": "5056:46:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1477,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5056:130:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1478,
                  "nodeType": "ExpressionStatement",
                  "src": "5056:130:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1484,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1463,
                        "src": "5308:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1485,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5335:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1486,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5335:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1487,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1465,
                        "src": "5359:9:8",
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
                              "id": 1480,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "5264:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1481,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "5264:18:8",
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
                          "id": 1479,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "5257:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1482,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5257:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2864,
                      "src": "5257:37:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1488,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5257:121:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1489,
                  "nodeType": "ExpressionStatement",
                  "src": "5257:121:8"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1491,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1466,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1463,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1491,
                  "src": "4914:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4914:7:8",
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
                  "id": 1465,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1491,
                  "src": "4945:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1464,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4945:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4904:61:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1467,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4985:0:8"
            },
            "scope": 1492,
            "src": "4887:498:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1493,
        "src": "1113:4274:8"
      }
    ],
    "src": "597:4791:8"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1492
      ]
    },
    "id": 1493,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1290,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:8"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1292,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 5804,
        "src": "622:73:8",
        "symbolAliases": [
          {
            "foreign": 1291,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreSharedModifiers.sol",
        "file": "../lib/CoreSharedModifiers.sol",
        "id": 1294,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2976,
        "src": "696:63:8",
        "symbolAliases": [
          {
            "foreign": 1293,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1296,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 3089,
        "src": "760:49:8",
        "symbolAliases": [
          {
            "foreign": 1295,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1298,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2854,
        "src": "810:66:8",
        "symbolAliases": [
          {
            "foreign": 1297,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1300,
        "nodeType": "ImportDirective",
        "scope": 1493,
        "sourceUnit": 2893,
        "src": "877:50:8",
        "symbolAliases": [
          {
            "foreign": 1299,
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
              "id": 1301,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3088,
              "src": "1144:9:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3088",
                "typeString": "contract CoreState"
              }
            },
            "id": 1302,
            "nodeType": "InheritanceSpecifier",
            "src": "1144:9:8"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1303,
              "name": "CoreModifiers",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2975,
              "src": "1159:13:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreModifiers_$2975",
                "typeString": "contract CoreModifiers"
              }
            },
            "id": 1304,
            "nodeType": "InheritanceSpecifier",
            "src": "1159:13:8"
          }
        ],
        "contractDependencies": [
          2975,
          3088
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1492,
        "linearizedBaseContracts": [
          1492,
          2975,
          3088
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1307,
            "libraryName": {
              "contractScope": null,
              "id": 1305,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5803,
              "src": "1240:8:8",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5803",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1234:27:8",
            "typeName": {
              "id": 1306,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1253:7:8",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": true,
            "id": 1310,
            "name": "ADDRESSES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1314:66:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1308,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1314:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "416464726573736573206d757374206e6f7420626520656d7074792e",
              "id": 1309,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1350:30:8",
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
            "id": 1313,
            "name": "BATCH_INPUT_MISMATCH",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1386:90:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1311,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1386:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "41646472657373657320616e64207175616e746974696573206d757374206265207468652073616d65206c656e6774682e",
              "id": 1312,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1425:51:8",
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
            "id": 1316,
            "name": "QUANTITES_MISSING",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1482:67:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1314,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1482:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e746974696573206d757374206e6f7420626520656d7074792e",
              "id": 1315,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1518:31:8",
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
            "id": 1319,
            "name": "ZERO_QUANTITY",
            "nodeType": "VariableDeclaration",
            "scope": 1492,
            "src": "1555:69:8",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_memory",
              "typeString": "string"
            },
            "typeName": {
              "id": 1317,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "1555:6:8",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "5175616e74697479206d7573742062652067726561746572207468616e207a65726f2e",
              "id": 1318,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "1587:37:8",
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
              "id": 1353,
              "nodeType": "Block",
              "src": "1822:515:8",
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
                        "id": 1331,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1328,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1322,
                            "src": "1912:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1329,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "1912:22:8",
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
                          "id": 1330,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "1937:1:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "1912:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1332,
                        "name": "ADDRESSES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1310,
                        "src": "1952:17:8",
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
                      "id": 1327,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "1891:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1333,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1891:88:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1334,
                  "nodeType": "ExpressionStatement",
                  "src": "1891:88:8"
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
                        "id": 1339,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1336,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1325,
                            "src": "2071:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1337,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2071:18:8",
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
                          "id": 1338,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "2092:1:8",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "2071:22:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1340,
                        "name": "QUANTITES_MISSING",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1316,
                        "src": "2107:17:8",
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
                      "id": 1335,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2050:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1341,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2050:84:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1342,
                  "nodeType": "ExpressionStatement",
                  "src": "2050:84:8"
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
                        "id": 1348,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1344,
                            "name": "_tokenAddresses",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1322,
                            "src": "2231:15:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1345,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2231:22:8",
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
                            "id": 1346,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1325,
                            "src": "2257:11:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1347,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "2257:18:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2231:44:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1349,
                        "name": "BATCH_INPUT_MISMATCH",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1313,
                        "src": "2289:20:8",
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
                      "id": 1343,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6359,
                        6360
                      ],
                      "referencedDeclaration": 6360,
                      "src": "2210:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 1350,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2210:109:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1351,
                  "nodeType": "ExpressionStatement",
                  "src": "2210:109:8"
                },
                {
                  "id": 1352,
                  "nodeType": "PlaceholderStatement",
                  "src": "2329:1:8"
                }
              ]
            },
            "documentation": null,
            "id": 1354,
            "name": "isValidBatchTransaction",
            "nodeType": "ModifierDefinition",
            "parameters": {
              "id": 1326,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1354,
                  "src": "1775:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1320,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "1775:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1321,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1775:9:8",
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
                  "id": 1325,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1354,
                  "src": "1802:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1323,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "1802:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1324,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "1802:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1774:47:8"
            },
            "src": "1742:595:8",
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1389,
              "nodeType": "Block",
              "src": "2878:246:8",
              "statements": [
                {
                  "body": {
                    "id": 1387,
                    "nodeType": "Block",
                    "src": "3004:114:8",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1379,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1357,
                                "src": "3043:15:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1381,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1380,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1368,
                                "src": "3059:1:8",
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
                              "src": "3043:18:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1382,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1360,
                                "src": "3079:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1384,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1383,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1368,
                                "src": "3091:1:8",
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
                              "src": "3079:14:8",
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
                            "id": 1378,
                            "name": "deposit",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1461,
                            "src": "3018:7:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1385,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3018:89:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1386,
                        "nodeType": "ExpressionStatement",
                        "src": "3018:89:8"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1374,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1371,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1368,
                      "src": "2971:1:8",
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
                        "id": 1372,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1357,
                        "src": "2975:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1373,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "2975:22:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "2971:26:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1388,
                  "initializationExpression": {
                    "assignments": [
                      1368
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1368,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1390,
                        "src": "2959:6:8",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1367,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "2959:4:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1370,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1369,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "2968:1:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "2959:10:8"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1376,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "2999:3:8",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1375,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1368,
                        "src": "2999:1:8",
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
                    "id": 1377,
                    "nodeType": "ExpressionStatement",
                    "src": "2999:3:8"
                  },
                  "nodeType": "ForStatement",
                  "src": "2954:164:8"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _tokenAddresses   Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1390,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1363,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1357,
                    "src": "2844:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1364,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1360,
                    "src": "2861:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1365,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1362,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1354,
                  "src": "2820:23:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2820:53:8"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1361,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1357,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1390,
                  "src": "2735:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1355,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2735:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1356,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2735:9:8",
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
                  "id": 1360,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1390,
                  "src": "2770:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1358,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "2770:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1359,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2770:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2725:69:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1366,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2878:0:8"
            },
            "scope": 1492,
            "src": "2704:420:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1425,
              "nodeType": "Block",
              "src": "3618:248:8",
              "statements": [
                {
                  "body": {
                    "id": 1423,
                    "nodeType": "Block",
                    "src": "3745:115:8",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1415,
                                "name": "_tokenAddresses",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1393,
                                "src": "3785:15:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1417,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1416,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3801:1:8",
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
                              "src": "3785:18:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1418,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1396,
                                "src": "3821:11:8",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1420,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1419,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3833:1:8",
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
                              "src": "3821:14:8",
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
                            "id": 1414,
                            "name": "withdraw",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1491,
                            "src": "3759:8:8",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1421,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3759:90:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1422,
                        "nodeType": "ExpressionStatement",
                        "src": "3759:90:8"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1410,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1407,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1404,
                      "src": "3712:1:8",
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
                        "id": 1408,
                        "name": "_tokenAddresses",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1393,
                        "src": "3716:15:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1409,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3716:22:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3712:26:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1424,
                  "initializationExpression": {
                    "assignments": [
                      1404
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1404,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1426,
                        "src": "3700:6:8",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1403,
                          "name": "uint",
                          "nodeType": "ElementaryTypeName",
                          "src": "3700:4:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1406,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1405,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3709:1:8",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3700:10:8"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1412,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3740:3:8",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1411,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1404,
                        "src": "3740:1:8",
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
                    "id": 1413,
                    "nodeType": "ExpressionStatement",
                    "src": "3740:3:8"
                  },
                  "nodeType": "ForStatement",
                  "src": "3695:165:8"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokenAddresses    Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1426,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1399,
                    "name": "_tokenAddresses",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1393,
                    "src": "3584:15:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                      "typeString": "address[] calldata"
                    }
                  },
                  {
                    "argumentTypes": null,
                    "id": 1400,
                    "name": "_quantities",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1396,
                    "src": "3601:11:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                      "typeString": "uint256[] calldata"
                    }
                  }
                ],
                "id": 1401,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1398,
                  "name": "isValidBatchTransaction",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 1354,
                  "src": "3560:23:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$",
                    "typeString": "modifier (address[] memory,uint256[] memory)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3560:53:8"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1397,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1393,
                  "name": "_tokenAddresses",
                  "nodeType": "VariableDeclaration",
                  "scope": 1426,
                  "src": "3475:25:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1391,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3475:7:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1392,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3475:9:8",
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
                  "id": 1396,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1426,
                  "src": "3510:18:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1394,
                      "name": "uint",
                      "nodeType": "ElementaryTypeName",
                      "src": "3510:4:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1395,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3510:6:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3465:69:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1402,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3618:0:8"
            },
            "scope": 1492,
            "src": "3443:423:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1460,
              "nodeType": "Block",
              "src": "4211:466:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1441,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1428,
                        "src": "4358:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1442,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1430,
                        "src": "4385:9:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1443,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "4408:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1444,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4408:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1445,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3004,
                          "src": "4432:5:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3002_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1446,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vaultAddress",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 2985,
                        "src": "4432:18:8",
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
                              "id": 1437,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4308:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1438,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxyAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2983,
                            "src": "4308:26:8",
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
                          "id": 1436,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2853,
                          "src": "4293:14:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$2853_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1439,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4293:42:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$2853",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1440,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2852,
                      "src": "4293:51:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1447,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4293:167:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1448,
                  "nodeType": "ExpressionStatement",
                  "src": "4293:167:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1454,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "4600:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1455,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4600:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1456,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1428,
                        "src": "4624:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1457,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1430,
                        "src": "4651:9:8",
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
                              "id": 1450,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "4547:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1451,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "4547:18:8",
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
                          "id": 1449,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "4540:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1452,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4540:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1453,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2873,
                      "src": "4540:46:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1458,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "4540:130:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1459,
                  "nodeType": "ExpressionStatement",
                  "src": "4540:130:8"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1461,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": [
                  {
                    "argumentTypes": null,
                    "id": 1433,
                    "name": "_quantity",
                    "nodeType": "Identifier",
                    "overloadedDeclarations": [],
                    "referencedDeclaration": 1430,
                    "src": "4196:9:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  }
                ],
                "id": 1434,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1432,
                  "name": "isPositiveQuantity",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 2925,
                  "src": "4177:18:8",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$_t_uint256_$",
                    "typeString": "modifier (uint256)"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4177:29:8"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1431,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1428,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1461,
                  "src": "4102:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1427,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4102:7:8",
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
                  "id": 1430,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1461,
                  "src": "4133:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1429,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4133:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4092:61:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1435,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4211:0:8"
            },
            "scope": 1492,
            "src": "4076:601:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 1490,
              "nodeType": "Block",
              "src": "4985:400:8",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1473,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5116:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1474,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5116:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1475,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1463,
                        "src": "5140:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1476,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1465,
                        "src": "5167:9:8",
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
                              "id": 1469,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "5063:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1470,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "5063:18:8",
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
                          "id": 1468,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "5056:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1471,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5056:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1472,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2882,
                      "src": "5056:46:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1477,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5056:130:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1478,
                  "nodeType": "ExpressionStatement",
                  "src": "5056:130:8"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1484,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1463,
                        "src": "5308:13:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1485,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6356,
                          "src": "5335:3:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1486,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "5335:10:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1487,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1465,
                        "src": "5359:9:8",
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
                              "id": 1480,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3004,
                              "src": "5264:5:8",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3002_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1481,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vaultAddress",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 2985,
                            "src": "5264:18:8",
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
                          "id": 1479,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2892,
                          "src": "5257:6:8",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$2892_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1482,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5257:26:8",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$2892",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1483,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 2864,
                      "src": "5257:37:8",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1488,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5257:121:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1489,
                  "nodeType": "ExpressionStatement",
                  "src": "5257:121:8"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _tokenAddress    The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1491,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1466,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1463,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 1491,
                  "src": "4914:21:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1462,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4914:7:8",
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
                  "id": 1465,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1491,
                  "src": "4945:14:8",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1464,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "4945:4:8",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4904:61:8"
            },
            "payable": false,
            "returnParameters": {
              "id": 1467,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4985:0:8"
            },
            "scope": 1492,
            "src": "4887:498:8",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1493,
        "src": "1113:4274:8"
      }
    ],
    "src": "597:4791:8"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-08T01:11:15.190Z"
}