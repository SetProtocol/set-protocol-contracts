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
      "constant": false,
      "inputs": [
        {
          "name": "_token",
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
          "name": "_token",
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
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokens",
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
          "name": "_tokens",
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        }
      ],
      "name": "internalTransfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x60806040526009805460ff1916905534801561001a57600080fd5b50610a1f8061002a6000396000f3006080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100df5780631e912bd61461011457806330a907361461013e57806347e7ef241461016c578063559ed3391461019057806359e026f7146101f55780636e667db31461021f578063a003e06914610250578063c19d93fb1461026b578063e131243e146102a6578063f3fef3a3146102d2578063f7213db6146102f6578063fbfa77cf1461030e578063fe5b38e414610323578063fef3ee7314610338575b600080fd5b3480156100eb57600080fd5b50610100600160a060020a0360043516610359565b604080519115158252519081900360200190f35b34801561012057600080fd5b5061012c600435610377565b60408051918252519081900360200190f35b34801561014a57600080fd5b5061016a6024600480358281019290820135918135918201910135610389565b005b34801561017857600080fd5b5061016a600160a060020a036004351660243561041a565b34801561019c57600080fd5b506101a5610451565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e15781810151838201526020016101c9565b505050509050019250505060405180910390f35b34801561020157600080fd5b5061016a600160a060020a03600435811690602435166044356104b6565b34801561022b57600080fd5b50610234610576565b60408051600160a060020a039092168252519081900360200190f35b34801561025c57600080fd5b5061023460ff60043516610585565b34801561027757600080fd5b506102806105a3565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102b257600080fd5b5061016a60246004803582810192908201359181359182019101356105b9565b3480156102de57600080fd5b5061016a600160a060020a036004351660243561065d565b34801561030257600080fd5b5061012c600435610684565b34801561031a57600080fd5b50610234610696565b34801561032f57600080fd5b506101a56106a5565b34801561034457600080fd5b50610100600160a060020a0360043516610708565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60095460ff161561039957600080fd5b6009805460ff19166001179055604080516020808602828101820190935285825261040a923392839290918991899182918501908490808284375050604080516020808c0282810182019093528b82529095508b94508a935083925085019084908082843750610726945050505050565b50506009805460ff191690555050565b60095460ff161561042a57600080fd5b6009805460ff19166001179055610443338084846107a9565b50506009805460ff19169055565b606060006006018054806020026020016040519081016040528092919081815260200182805480156104ac57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161048e575b5050505050905090565b60095460ff16156104c657600080fd5b6009805460ff19166001179055600254604080517fb19ad577000000000000000000000000000000000000000000000000000000008152600160a060020a0386811660048301523360248301528581166044830152606482018590529151919092169163b19ad57791608480830192600092919082900301818387803b15801561054f57600080fd5b505af1158015610563573d6000803e3d6000fd5b50506009805460ff191690555050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60095460009060ff16156105cc57600080fd5b6009805460ff19166001179055600084116105e657600080fd5b600082116105f357600080fd5b8382146105ff57600080fd5b5060005b8381101561064c5761064485858381811061061a57fe5b90506020020135600160a060020a0316848484818110151561063857fe5b905060200201356108d6565b600101610603565b50506009805460ff19169055505050565b60095460ff161561066d57600080fd5b6009805460ff1916600117905561044382826108d6565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156104ac57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161048e575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b600080835111151561073757600080fd5b815160001061074557600080fd5b815183511461075357600080fd5b5060005b82518110156107a25761079a8585858481518110151561077357fe5b90602001906020020151858581518110151561078b57fe5b906020019060200201516107a9565b600101610757565b5050505050565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b15801561082a57600080fd5b505af115801561083e573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152888116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b1580156108b857600080fd5b505af11580156108cc573d6000803e3d6000fd5b5050505050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152600160a060020a038581166004830152336024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561094d57600080fd5b505af1158015610961573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b1580156109d657600080fd5b505af11580156109ea573d6000803e3d6000fd5b505050505050505600a165627a7a7230582050a0d5e747a9f356565577cfcd4cb6b40aed2b22b9d13247aced92a2b10bd91b0029",
  "deployedBytecode": "0x6080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100df5780631e912bd61461011457806330a907361461013e57806347e7ef241461016c578063559ed3391461019057806359e026f7146101f55780636e667db31461021f578063a003e06914610250578063c19d93fb1461026b578063e131243e146102a6578063f3fef3a3146102d2578063f7213db6146102f6578063fbfa77cf1461030e578063fe5b38e414610323578063fef3ee7314610338575b600080fd5b3480156100eb57600080fd5b50610100600160a060020a0360043516610359565b604080519115158252519081900360200190f35b34801561012057600080fd5b5061012c600435610377565b60408051918252519081900360200190f35b34801561014a57600080fd5b5061016a6024600480358281019290820135918135918201910135610389565b005b34801561017857600080fd5b5061016a600160a060020a036004351660243561041a565b34801561019c57600080fd5b506101a5610451565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e15781810151838201526020016101c9565b505050509050019250505060405180910390f35b34801561020157600080fd5b5061016a600160a060020a03600435811690602435166044356104b6565b34801561022b57600080fd5b50610234610576565b60408051600160a060020a039092168252519081900360200190f35b34801561025c57600080fd5b5061023460ff60043516610585565b34801561027757600080fd5b506102806105a3565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102b257600080fd5b5061016a60246004803582810192908201359181359182019101356105b9565b3480156102de57600080fd5b5061016a600160a060020a036004351660243561065d565b34801561030257600080fd5b5061012c600435610684565b34801561031a57600080fd5b50610234610696565b34801561032f57600080fd5b506101a56106a5565b34801561034457600080fd5b50610100600160a060020a0360043516610708565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60095460ff161561039957600080fd5b6009805460ff19166001179055604080516020808602828101820190935285825261040a923392839290918991899182918501908490808284375050604080516020808c0282810182019093528b82529095508b94508a935083925085019084908082843750610726945050505050565b50506009805460ff191690555050565b60095460ff161561042a57600080fd5b6009805460ff19166001179055610443338084846107a9565b50506009805460ff19169055565b606060006006018054806020026020016040519081016040528092919081815260200182805480156104ac57602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161048e575b5050505050905090565b60095460ff16156104c657600080fd5b6009805460ff19166001179055600254604080517fb19ad577000000000000000000000000000000000000000000000000000000008152600160a060020a0386811660048301523360248301528581166044830152606482018590529151919092169163b19ad57791608480830192600092919082900301818387803b15801561054f57600080fd5b505af1158015610563573d6000803e3d6000fd5b50506009805460ff191690555050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b60095460009060ff16156105cc57600080fd5b6009805460ff19166001179055600084116105e657600080fd5b600082116105f357600080fd5b8382146105ff57600080fd5b5060005b8381101561064c5761064485858381811061061a57fe5b90506020020135600160a060020a0316848484818110151561063857fe5b905060200201356108d6565b600101610603565b50506009805460ff19169055505050565b60095460ff161561066d57600080fd5b6009805460ff1916600117905561044382826108d6565b60009081526007602052604090205490565b600254600160a060020a031690565b606060006004018054806020026020016040519081016040528092919081815260200182805480156104ac57602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161048e575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b600080835111151561073757600080fd5b815160001061074557600080fd5b815183511461075357600080fd5b5060005b82518110156107a25761079a8585858481518110151561077357fe5b90602001906020020151858581518110151561078b57fe5b906020019060200201516107a9565b600101610757565b5050505050565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b15801561082a57600080fd5b505af115801561083e573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152888116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b1580156108b857600080fd5b505af11580156108cc573d6000803e3d6000fd5b5050505050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152600160a060020a038581166004830152336024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561094d57600080fd5b505af1158015610961573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b1580156109d657600080fd5b505af11580156109ea573d6000803e3d6000fd5b505050505050505600a165627a7a7230582050a0d5e747a9f356565577cfcd4cb6b40aed2b22b9d13247aced92a2b10bd91b0029",
  "sourceMap": "1123:6360:5:-;;;321:35:25;;;-1:-1:-1;;321:35:25;;;1123:6360:5;5:2:-1;;;;30:1;27;20:12;5:2;1123:6360:5;;;;;;;",
  "deployedSourceMap": "1123:6360:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:19;-1:-1:-1;;;;;2803:164:19;;;;;;;;;;;;;;;;;;;;;;;4385:167;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:19;;;;;;;;;;;;;;;;;;;;;2604:317:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2604:317:5;;;;;;;;;;;;;;;;;;;;;;;;;;1563:291;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1563:291:5;-1:-1:-1;;;;;1563:291:5;;;;;;;3685:119:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:19;;;;;;;;;;;;;;;;;4270:292:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4270:292:5;-1:-1:-1;;;;;4270:292:5;;;;;;;;;;;;2263:125:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:19;;;;;;;;-1:-1:-1;;;;;2263:125:19;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:19;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:19;;;;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;;;;;;;;;;;;;;;;;;;3240:689:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3240:689:5;;;;;;;;;;;;;;;;;;;;;;;;2064:203;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2064:203:5;-1:-1:-1;;;;;2064:203:5;;;;;;;4011:163:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:19;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:19;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:19;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:19;-1:-1:-1;;;;;3409:146:19;;;;;2803:164;-1:-1:-1;;;;;2930:30:19;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4385:167::-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;2604:317:5:-;782:14:25;;;;781:15;773:24;;;;;;803:14;:21;;-1:-1:-1;;803:21:25;820:4;803:21;;;2790:124:5;;;;;;;;;;;;;;;;;;;;2824:10;;;;2790:124;;2872:7;;;;;;2790:124;;;2872:7;;2790:124;2872:7;2790:124;;-1:-1:-1;;2790:124:5;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2893:11:5;;-1:-1:-1;2893:11:5;;-1:-1:-1;2893:11:5;;-1:-1:-1;2790:124:5;;;2893:11;;2790:124;2893:11;2790:124;;-1:-1:-1;2790:20:5;;-1:-1:-1;;;;;2790:124:5:i;:::-;-1:-1:-1;;837:14:25;:22;;-1:-1:-1;;837:22:25;;;-1:-1:-1;;2604:317:5:o;1563:291::-;782:14:25;;;;781:15;773:24;;;;;;803:14;:21;;-1:-1:-1;;803:21:25;820:4;803:21;;;1731:116:5;1760:10;;1808:6;1828:9;1731:15;:116::i;:::-;-1:-1:-1;;837:14:25;:22;;-1:-1:-1;;837:22:25;;;1563:291:5:o;3685:119:19:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:19;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;4270:292:5:-;782:14:25;;;;781:15;773:24;;;;;;803:14;:21;;-1:-1:-1;;803:21:25;820:4;803:21;;;4433:11:5;;4426:129;;;;;;-1:-1:-1;;;;;4426:129:5;;;;;;;4492:10;4426:129;;;;;;;;;;;;;;;;;;;4433:11;;;;;4426:35;;:129;;;;;803:14:25;;4426:129:5;;;;;;;803:14:25;4433:11:5;4426:129;;;5:2:-1;;;;30:1;27;20:12;5:2;4426:129:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;837:14:25;:22;;-1:-1:-1;;837:22:25;;;-1:-1:-1;;;;;4270:292:5:o;2263:125:19:-;2362:19;;-1:-1:-1;;;;;2362:19:19;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:19;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;:::o;3240:689:5:-;782:14:25;;3768:9:5;;782:14:25;;781:15;773:24;;;;;;803:14;:21;;-1:-1:-1;;803:21:25;820:4;803:21;;;:14;3443:18:5;;3435:27;;;;;;3562:1;3541:22;;3533:31;;;;;;3648:36;;;3640:45;;;;;;-1:-1:-1;3780:1:5;3763:160;3783:18;;;3763:160;;;3822:90;3856:7;;3864:1;3856:10;;;;;;;;;;;;;-1:-1:-1;;;;;3856:10:5;3884:11;;3896:1;3884:14;;;;;;;;;;;;;;;3822:16;:90::i;:::-;3803:3;;3763:160;;;-1:-1:-1;;837:14:25;:22;;-1:-1:-1;;837:22:25;;;-1:-1:-1;;;3240:689:5:o;2064:203::-;782:14:25;;;;781:15;773:24;;;;;;803:14;:21;;-1:-1:-1;;803:21:25;820:4;803:21;;;2191:69:5;2221:6;2241:9;2191:16;:69::i;4011:163:19:-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:19;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:19;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:19;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;6711:770:5:-;7277:9;6962:1;6945:7;:14;:18;6937:27;;;;;;;;7043:18;;7064:1;-1:-1:-1;7035:31:5;;;;;;7168:18;;7150:14;;:36;7142:45;;;;;;-1:-1:-1;7289:1:5;7272:203;7296:7;:14;7292:1;:18;7272:203;;;7331:133;7364:5;7387:3;7408:7;7416:1;7408:10;;;;;;;;;;;;;;;;;;7436:11;7448:1;7436:14;;;;;;;;;;;;;;;;;;7331:15;:133::i;:::-;7312:3;;7272:203;;;6711:770;;;;;:::o;4949:566::-;5193:19;;5298:11;;5178:141;;;;;;-1:-1:-1;;;;;5178:141:5;;;;;;;;;;;;;;;;;;;;5298:11;;;5178:141;;;;;;5193:19;;;;;5178:44;;:141;;;;;5193:5;;5178:141;;;;;;;5193:5;:19;5178:141;;;5:2:-1;;;;30:1;27;20:12;5:2;5178:141:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5406:11:5;;5399:109;;;;;;-1:-1:-1;;;;;5399:109:5;;;;;;;;;;;;;;;;;;;;;;5406:11;;;;;-1:-1:-1;5399:39:5;;-1:-1:-1;5399:109:5;;;;;5406:5;;5399:109;;;;;;;5406:5;:11;5399:109;;;5:2:-1;;;;30:1;27;20:12;5:2;5399:109:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5399:109:5;;;;4949:566;;;;:::o;5749:541::-;5933:11;;6017:102;;;;;;-1:-1:-1;;;;;6017:102:5;;;;;;;6076:10;6017:102;;;;;;;;;;;;5933:11;;;;;;;6017:25;;:102;;;;;5911:12;;6017:102;;;;;;;;5911:12;5933:11;6017:102;;;5:2:-1;;;;30:1;27;20:12;5:2;6017:102:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;6190:93:5;;;;;;-1:-1:-1;;;;;6190:93:5;;;;;;;6240:10;6190:93;;;;;;;;;;;;:16;;;;-1:-1:-1;6190:16:5;;-1:-1:-1;6190:93:5;;;;;-1:-1:-1;;6190:93:5;;;;;;;;-1:-1:-1;6190:16:5;:93;;;5:2:-1;;;;30:1;27;20:12;5:2;6190:93:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;6190:93:5;;;;5749:541;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { ReentrancyGuard } from \"zeppelin-solidity/contracts/ReentrancyGuard.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState,\n    ReentrancyGuard\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault and attribute to sender.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        // Call internal deposit function\n        depositInternal(\n            msg.sender,\n            msg.sender,\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        withdrawInternal(\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Deposit multiple tokens to the vault and attribute to sender.\n     * Quantities should be in the order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external\n        nonReentrant\n    {\n        // Call internal batch deposit function\n        batchDepositInternal(\n            msg.sender,\n            msg.sender,\n            _tokens,\n            _quantities\n        );\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external\n        nonReentrant\n    {\n        // Confirm an empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run withdraw function\n        for (uint256 i = 0; i < _tokens.length; i++) {\n            withdrawInternal(\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Sender can transfer tokens associated with their account in Vault to\n     * another users account in vault\n     *\n     * @param  _to             Address token being transferred to\n     * @param  _token          Address of token being transferred\n     * @param  _quantity       Amount of tokens being transferred\n     */\n    function internalTransfer(\n        address _to,\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        IVault(state.vault).transferBalance(\n            _to,\n            msg.sender,\n            _token,\n            _quantity\n        );\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _from            Address depositing token\n     * @param  _to              Address to credit for deposit\n     * @param  _token           Address of token being deposited\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function depositInternal(\n        address _from,\n        address _to,\n        address _token,\n        uint256 _quantity\n    )\n        internal\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxy).transfer(\n            _token,\n            _quantity,\n            _from,\n            state.vault\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vault).incrementTokenOwner(\n            _token,\n            _to,\n            _quantity\n        );\n    }\n\n    /**\n     * Internal function that Withdraws a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdrawInternal(\n        address _token,\n        uint256 _quantity\n    )\n        internal\n    {\n        // Declare interface variavle for vault\n        IVault vault = IVault(state.vault);\n\n        // Call Vault contract to deattribute tokens to user\n        vault.decrementTokenOwner(\n            _token,\n            msg.sender,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        vault.withdrawTo(\n            _token,\n            msg.sender,\n            _quantity\n        );\n    }\n\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _from            Address depositing tokens\n     * @param  _to              Address to credit for deposits\n     * @param  _tokens          Addresses of tokens being deposited\n     * @param  _quantities      The quantities of tokens to deposit\n     */\n    function batchDepositInternal(\n        address _from,\n        address _to,\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        internal\n    {\n        // Confirm and empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run depositInternal function\n        for (uint256 i = 0; i < _tokens.length; i++) {\n            depositInternal(\n                _from,\n                _to,\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1472
      ]
    },
    "id": 1473,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1192,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
        "file": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
        "id": 1194,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 5320,
        "src": "622:82:5",
        "symbolAliases": [
          {
            "foreign": 1193,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1196,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 5485,
        "src": "705:73:5",
        "symbolAliases": [
          {
            "foreign": 1195,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1198,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3609,
        "src": "779:49:5",
        "symbolAliases": [
          {
            "foreign": 1197,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1200,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3420,
        "src": "829:66:5",
        "symbolAliases": [
          {
            "foreign": 1199,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1202,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3470,
        "src": "896:50:5",
        "symbolAliases": [
          {
            "foreign": 1201,
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
              "id": 1203,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3608,
              "src": "1154:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3608",
                "typeString": "contract CoreState"
              }
            },
            "id": 1204,
            "nodeType": "InheritanceSpecifier",
            "src": "1154:9:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1205,
              "name": "ReentrancyGuard",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5319,
              "src": "1169:15:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ReentrancyGuard_$5319",
                "typeString": "contract ReentrancyGuard"
              }
            },
            "id": 1206,
            "nodeType": "InheritanceSpecifier",
            "src": "1169:15:5"
          }
        ],
        "contractDependencies": [
          3608,
          5319
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1472,
        "linearizedBaseContracts": [
          1472,
          5319,
          3608
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1209,
            "libraryName": {
              "contractScope": null,
              "id": 1207,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5484,
              "src": "1252:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5484",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1246:27:5",
            "typeName": {
              "id": 1208,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1265:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 1227,
              "nodeType": "Block",
              "src": "1679:175:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1219,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "1760:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1220,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1760:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1221,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "1784:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1222,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1784:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1223,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1211,
                        "src": "1808:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1224,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "1828:9:5",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1218,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1378,
                      "src": "1731:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 1225,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1731:116:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1226,
                  "nodeType": "ExpressionStatement",
                  "src": "1731:116:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1228,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1216,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1215,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "1662:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1662:12:5"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1211,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1228,
                  "src": "1589:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1210,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1589:7:5",
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
                  "id": 1213,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1228,
                  "src": "1613:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1212,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1613:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1579:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1217,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1679:0:5"
            },
            "scope": 1472,
            "src": "1563:291:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1242,
              "nodeType": "Block",
              "src": "2181:86:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1238,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1230,
                        "src": "2221:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1239,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1232,
                        "src": "2241:9:5",
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
                      "id": 1237,
                      "name": "withdrawInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1411,
                      "src": "2191:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 1240,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2191:69:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1241,
                  "nodeType": "ExpressionStatement",
                  "src": "2191:69:5"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1243,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1235,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1234,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "2164:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2164:12:5"
              }
            ],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1230,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1243,
                  "src": "2091:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1229,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2091:7:5",
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
                  "id": 1232,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1243,
                  "src": "2115:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1231,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2115:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2081:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1236,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:5"
            },
            "scope": 1472,
            "src": "2064:203:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1263,
              "nodeType": "Block",
              "src": "2732:189:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1255,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "2824:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1256,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2824:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1257,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "2848:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1258,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2848:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1259,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1246,
                        "src": "2872:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1260,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1249,
                        "src": "2893:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
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
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      ],
                      "id": 1254,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1471,
                      "src": "2790:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 1261,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2790:124:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1262,
                  "nodeType": "ExpressionStatement",
                  "src": "2790:124:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1264,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1252,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1251,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "2715:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2715:12:5"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1250,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1246,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1264,
                  "src": "2635:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1244,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2635:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1245,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2635:9:5",
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
                  "id": 1249,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1264,
                  "src": "2662:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1247,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2662:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1248,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2662:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2625:64:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1253,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2732:0:5"
            },
            "scope": 1472,
            "src": "2604:317:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1319,
              "nodeType": "Block",
              "src": "3369:560:5",
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
                        "id": 1279,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1276,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1267,
                            "src": "3443:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1277,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3443:14:5",
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
                          "id": 1278,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3460:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3443:18:5",
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
                      "id": 1275,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3435:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1280,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3435:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1281,
                  "nodeType": "ExpressionStatement",
                  "src": "3435:27:5"
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
                        "id": 1286,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1283,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1270,
                            "src": "3541:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1284,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3541:18:5",
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
                          "id": 1285,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3562:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3541:22:5",
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
                      "id": 1282,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3533:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1287,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3533:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1288,
                  "nodeType": "ExpressionStatement",
                  "src": "3533:31:5"
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
                        "id": 1294,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1290,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1267,
                            "src": "3648:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1291,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3648:14:5",
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
                            "id": 1292,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1270,
                            "src": "3666:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3666:18:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3648:36:5",
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
                      "id": 1289,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3640:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3640:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1296,
                  "nodeType": "ExpressionStatement",
                  "src": "3640:45:5"
                },
                {
                  "body": {
                    "id": 1317,
                    "nodeType": "Block",
                    "src": "3808:115:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1309,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1267,
                                "src": "3856:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1311,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1310,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1298,
                                "src": "3864:1:5",
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
                              "src": "3856:10:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1312,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1270,
                                "src": "3884:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1314,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1313,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1298,
                                "src": "3896:1:5",
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
                              "src": "3884:14:5",
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
                            "id": 1308,
                            "name": "withdrawInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1411,
                            "src": "3822:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1315,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3822:90:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1316,
                        "nodeType": "ExpressionStatement",
                        "src": "3822:90:5"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1304,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1301,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1298,
                      "src": "3783:1:5",
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
                        "id": 1302,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1267,
                        "src": "3787:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1303,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3787:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3783:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1318,
                  "initializationExpression": {
                    "assignments": [
                      1298
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1298,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1320,
                        "src": "3768:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1297,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3768:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1300,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1299,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3780:1:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3768:13:5"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1306,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3803:3:5",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1305,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1298,
                        "src": "3803:1:5",
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
                    "id": 1307,
                    "nodeType": "ExpressionStatement",
                    "src": "3803:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "3763:160:5"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1320,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1273,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1272,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "3352:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3352:12:5"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1271,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1267,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "3272:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1265,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3272:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1266,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3272:9:5",
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
                  "id": 1270,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "3299:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1268,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3299:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1269,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3299:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3262:64:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1274,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:5"
            },
            "scope": 1472,
            "src": "3240:689:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1343,
              "nodeType": "Block",
              "src": "4416:146:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1336,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1322,
                        "src": "4475:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1337,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "4492:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1338,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4492:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1339,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1324,
                        "src": "4516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1340,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1326,
                        "src": "4536:9:5",
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
                              "id": 1332,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "4433:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1333,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3479,
                            "src": "4433:11:5",
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
                          "id": 1331,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3469,
                          "src": "4426:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1334,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4426:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferBalance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3459,
                      "src": "4426:35:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256) external"
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
                    "src": "4426:129:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1342,
                  "nodeType": "ExpressionStatement",
                  "src": "4426:129:5"
                }
              ]
            },
            "documentation": "Sender can transfer tokens associated with their account in Vault to\nanother users account in vault\n     * @param  _to             Address token being transferred to\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 1344,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1329,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1328,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "4399:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4399:12:5"
              }
            ],
            "name": "internalTransfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1327,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4305:11:5",
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
                    "src": "4305:7:5",
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
                  "id": 1324,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4326:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1323,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4326:7:5",
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
                  "id": 1326,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4350:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1325,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4350:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4295:78:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1330,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4416:0:5"
            },
            "scope": 1472,
            "src": "4270:292:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1377,
              "nodeType": "Block",
              "src": "5096:419:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1360,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1350,
                        "src": "5236:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1361,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "5256:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1362,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1346,
                        "src": "5279:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1363,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3504,
                          "src": "5298:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3502_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1364,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3479,
                        "src": "5298:11:5",
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
                              "id": 1356,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "5193:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1357,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3477,
                            "src": "5193:19:5",
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
                          "id": 1355,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3419,
                          "src": "5178:14:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3419_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5178:35:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3419",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3418,
                      "src": "5178:44:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5178:141:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1366,
                  "nodeType": "ExpressionStatement",
                  "src": "5178:141:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1372,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1350,
                        "src": "5452:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1348,
                        "src": "5472:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1374,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "5489:9:5",
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
                              "id": 1368,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "5406:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1369,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3479,
                            "src": "5406:11:5",
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
                          "id": 1367,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3469,
                          "src": "5399:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1370,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5399:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1371,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3439,
                      "src": "5399:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1375,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5399:109:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1376,
                  "nodeType": "ExpressionStatement",
                  "src": "5399:109:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 1378,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1346,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "4983:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1345,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4983:7:5",
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
                  "id": 1348,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5006:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1347,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5006:7:5",
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
                  "id": 1350,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1349,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5027:7:5",
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
                  "id": 1352,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5051:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5051:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4973:101:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1354,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5096:0:5"
            },
            "scope": 1472,
            "src": "4949:566:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1410,
              "nodeType": "Block",
              "src": "5853:437:5",
              "statements": [
                {
                  "assignments": [
                    1386
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1386,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "5911:12:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$3469",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1385,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3469,
                        "src": "5911:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1391,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1388,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3504,
                          "src": "5933:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3502_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1389,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3479,
                        "src": "5933:11:5",
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
                      "id": 1387,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3469,
                      "src": "5926:6:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1390,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5926:19:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$3469",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5911:34:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1395,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "6056:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1396,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "6076:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1397,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "6076:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1398,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1382,
                        "src": "6100:9:5",
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
                        "id": 1392,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1386,
                        "src": "6017:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1394,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3448,
                      "src": "6017:25:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6017:102:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1400,
                  "nodeType": "ExpressionStatement",
                  "src": "6017:102:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1404,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "6220:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1405,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "6240:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1406,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "6240:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1407,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1382,
                        "src": "6264:9:5",
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
                        "id": 1401,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1386,
                        "src": "6190:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1403,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3430,
                      "src": "6190:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1408,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6190:93:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1409,
                  "nodeType": "ExpressionStatement",
                  "src": "6190:93:5"
                }
              ]
            },
            "documentation": "Internal function that Withdraws a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1411,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1380,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "5784:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5784:7:5",
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
                  "id": 1382,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "5808:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5808:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5774:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5853:0:5"
            },
            "scope": 1472,
            "src": "5749:541:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1470,
              "nodeType": "Block",
              "src": "6870:611:5",
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
                        "id": 1428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1425,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1418,
                            "src": "6945:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1426,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6945:14:5",
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
                          "id": 1427,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6962:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "6945:18:5",
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
                      "id": 1424,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "6937:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1429,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6937:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1430,
                  "nodeType": "ExpressionStatement",
                  "src": "6937:27:5"
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
                        "id": 1435,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1432,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1421,
                            "src": "7043:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1433,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7043:18:5",
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
                          "id": 1434,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7064:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "7043:22:5",
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
                      "id": 1431,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "7035:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1436,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7035:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1437,
                  "nodeType": "ExpressionStatement",
                  "src": "7035:31:5"
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
                        "id": 1443,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1439,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1418,
                            "src": "7150:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1440,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7150:14:5",
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
                            "id": 1441,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1421,
                            "src": "7168:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1442,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7168:18:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7150:36:5",
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
                      "id": 1438,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "7142:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1444,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7142:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1445,
                  "nodeType": "ExpressionStatement",
                  "src": "7142:45:5"
                },
                {
                  "body": {
                    "id": 1468,
                    "nodeType": "Block",
                    "src": "7317:158:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1458,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1413,
                              "src": "7364:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1459,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1415,
                              "src": "7387:3:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1460,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1418,
                                "src": "7408:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1462,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1461,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1447,
                                "src": "7416:1:5",
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
                              "src": "7408:10:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1463,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1421,
                                "src": "7436:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1465,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1464,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1447,
                                "src": "7448:1:5",
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
                              "src": "7436:14:5",
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
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1457,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1378,
                            "src": "7331:15:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
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
                          "src": "7331:133:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1467,
                        "nodeType": "ExpressionStatement",
                        "src": "7331:133:5"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1453,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1450,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1447,
                      "src": "7292:1:5",
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
                        "id": 1451,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1418,
                        "src": "7296:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1452,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7296:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7292:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1469,
                  "initializationExpression": {
                    "assignments": [
                      1447
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1447,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1471,
                        "src": "7277:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1446,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "7277:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1449,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1448,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7289:1:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "7277:13:5"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1455,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "7312:3:5",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1454,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1447,
                        "src": "7312:1:5",
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
                    "id": 1456,
                    "nodeType": "ExpressionStatement",
                    "src": "7312:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "7272:203:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1471,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1422,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1413,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6750:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1412,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6750:7:5",
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
                  "id": 1415,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6773:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1414,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6773:7:5",
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
                  "id": 1418,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6794:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1416,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6794:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1417,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6794:9:5",
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
                  "id": 1421,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6821:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1419,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "6821:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1420,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6821:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6740:108:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1423,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6870:0:5"
            },
            "scope": 1472,
            "src": "6711:770:5",
            "stateMutability": "nonpayable",
            "superFunction": 3313,
            "visibility": "internal"
          }
        ],
        "scope": 1473,
        "src": "1123:6360:5"
      }
    ],
    "src": "597:6887:5"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1472
      ]
    },
    "id": 1473,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1192,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:5"
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
        "file": "zeppelin-solidity/contracts/ReentrancyGuard.sol",
        "id": 1194,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 5320,
        "src": "622:82:5",
        "symbolAliases": [
          {
            "foreign": 1193,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1196,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 5485,
        "src": "705:73:5",
        "symbolAliases": [
          {
            "foreign": 1195,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1198,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3609,
        "src": "779:49:5",
        "symbolAliases": [
          {
            "foreign": 1197,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1200,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3420,
        "src": "829:66:5",
        "symbolAliases": [
          {
            "foreign": 1199,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1202,
        "nodeType": "ImportDirective",
        "scope": 1473,
        "sourceUnit": 3470,
        "src": "896:50:5",
        "symbolAliases": [
          {
            "foreign": 1201,
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
              "id": 1203,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3608,
              "src": "1154:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3608",
                "typeString": "contract CoreState"
              }
            },
            "id": 1204,
            "nodeType": "InheritanceSpecifier",
            "src": "1154:9:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1205,
              "name": "ReentrancyGuard",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5319,
              "src": "1169:15:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ReentrancyGuard_$5319",
                "typeString": "contract ReentrancyGuard"
              }
            },
            "id": 1206,
            "nodeType": "InheritanceSpecifier",
            "src": "1169:15:5"
          }
        ],
        "contractDependencies": [
          3608,
          5319
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1472,
        "linearizedBaseContracts": [
          1472,
          5319,
          3608
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1209,
            "libraryName": {
              "contractScope": null,
              "id": 1207,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 5484,
              "src": "1252:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$5484",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1246:27:5",
            "typeName": {
              "id": 1208,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1265:7:5",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 1227,
              "nodeType": "Block",
              "src": "1679:175:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1219,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "1760:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1220,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1760:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1221,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "1784:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1222,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "1784:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1223,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1211,
                        "src": "1808:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1224,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1213,
                        "src": "1828:9:5",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        },
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "id": 1218,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1378,
                      "src": "1731:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 1225,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1731:116:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1226,
                  "nodeType": "ExpressionStatement",
                  "src": "1731:116:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1228,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1216,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1215,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "1662:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1662:12:5"
              }
            ],
            "name": "deposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1214,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1211,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1228,
                  "src": "1589:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1210,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1589:7:5",
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
                  "id": 1213,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1228,
                  "src": "1613:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1212,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "1613:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1579:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1217,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1679:0:5"
            },
            "scope": 1472,
            "src": "1563:291:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1242,
              "nodeType": "Block",
              "src": "2181:86:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1238,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1230,
                        "src": "2221:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1239,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1232,
                        "src": "2241:9:5",
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
                      "id": 1237,
                      "name": "withdrawInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1411,
                      "src": "2191:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 1240,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2191:69:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1241,
                  "nodeType": "ExpressionStatement",
                  "src": "2191:69:5"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1243,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1235,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1234,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "2164:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2164:12:5"
              }
            ],
            "name": "withdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1233,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1230,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1243,
                  "src": "2091:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1229,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "2091:7:5",
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
                  "id": 1232,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1243,
                  "src": "2115:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1231,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "2115:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2081:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1236,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:5"
            },
            "scope": 1472,
            "src": "2064:203:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1263,
              "nodeType": "Block",
              "src": "2732:189:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1255,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "2824:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1256,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2824:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1257,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "2848:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1258,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "2848:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1259,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1246,
                        "src": "2872:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1260,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1249,
                        "src": "2893:11:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
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
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        },
                        {
                          "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                          "typeString": "uint256[] calldata"
                        }
                      ],
                      "id": 1254,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1471,
                      "src": "2790:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 1261,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2790:124:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1262,
                  "nodeType": "ExpressionStatement",
                  "src": "2790:124:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1264,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1252,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1251,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "2715:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "2715:12:5"
              }
            ],
            "name": "batchDeposit",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1250,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1246,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1264,
                  "src": "2635:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1244,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2635:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1245,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2635:9:5",
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
                  "id": 1249,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1264,
                  "src": "2662:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1247,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2662:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1248,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "2662:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "2625:64:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1253,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2732:0:5"
            },
            "scope": 1472,
            "src": "2604:317:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1319,
              "nodeType": "Block",
              "src": "3369:560:5",
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
                        "id": 1279,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1276,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1267,
                            "src": "3443:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1277,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3443:14:5",
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
                          "id": 1278,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3460:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3443:18:5",
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
                      "id": 1275,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3435:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1280,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3435:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1281,
                  "nodeType": "ExpressionStatement",
                  "src": "3435:27:5"
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
                        "id": 1286,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1283,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1270,
                            "src": "3541:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1284,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3541:18:5",
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
                          "id": 1285,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "3562:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "3541:22:5",
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
                      "id": 1282,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3533:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1287,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3533:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1288,
                  "nodeType": "ExpressionStatement",
                  "src": "3533:31:5"
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
                        "id": 1294,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1290,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1267,
                            "src": "3648:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1291,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3648:14:5",
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
                            "id": 1292,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1270,
                            "src": "3666:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1293,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "3666:18:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "3648:36:5",
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
                      "id": 1289,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "3640:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1295,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "3640:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1296,
                  "nodeType": "ExpressionStatement",
                  "src": "3640:45:5"
                },
                {
                  "body": {
                    "id": 1317,
                    "nodeType": "Block",
                    "src": "3808:115:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1309,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1267,
                                "src": "3856:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1311,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1310,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1298,
                                "src": "3864:1:5",
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
                              "src": "3856:10:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1312,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1270,
                                "src": "3884:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1314,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1313,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1298,
                                "src": "3896:1:5",
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
                              "src": "3884:14:5",
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
                            "id": 1308,
                            "name": "withdrawInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1411,
                            "src": "3822:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
                            }
                          },
                          "id": 1315,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "3822:90:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1316,
                        "nodeType": "ExpressionStatement",
                        "src": "3822:90:5"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1304,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1301,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1298,
                      "src": "3783:1:5",
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
                        "id": 1302,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1267,
                        "src": "3787:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1303,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "3787:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "3783:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1318,
                  "initializationExpression": {
                    "assignments": [
                      1298
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1298,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1320,
                        "src": "3768:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1297,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "3768:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1300,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1299,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "3780:1:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "3768:13:5"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1306,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "3803:3:5",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1305,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1298,
                        "src": "3803:1:5",
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
                    "id": 1307,
                    "nodeType": "ExpressionStatement",
                    "src": "3803:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "3763:160:5"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1320,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1273,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1272,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "3352:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "3352:12:5"
              }
            ],
            "name": "batchWithdraw",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1271,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1267,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "3272:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1265,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3272:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1266,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3272:9:5",
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
                  "id": 1270,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1320,
                  "src": "3299:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1268,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3299:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1269,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "3299:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "3262:64:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1274,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:5"
            },
            "scope": 1472,
            "src": "3240:689:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1343,
              "nodeType": "Block",
              "src": "4416:146:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1336,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1322,
                        "src": "4475:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1337,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "4492:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1338,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "4492:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1339,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1324,
                        "src": "4516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1340,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1326,
                        "src": "4536:9:5",
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
                              "id": 1332,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "4433:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1333,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3479,
                            "src": "4433:11:5",
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
                          "id": 1331,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3469,
                          "src": "4426:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1334,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4426:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1335,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferBalance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3459,
                      "src": "4426:35:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256) external"
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
                    "src": "4426:129:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1342,
                  "nodeType": "ExpressionStatement",
                  "src": "4426:129:5"
                }
              ]
            },
            "documentation": "Sender can transfer tokens associated with their account in Vault to\nanother users account in vault\n     * @param  _to             Address token being transferred to\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 1344,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1329,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1328,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 5318,
                  "src": "4399:12:5",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "4399:12:5"
              }
            ],
            "name": "internalTransfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1327,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1322,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4305:11:5",
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
                    "src": "4305:7:5",
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
                  "id": 1324,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4326:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1323,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4326:7:5",
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
                  "id": 1326,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1344,
                  "src": "4350:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1325,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "4350:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4295:78:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1330,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4416:0:5"
            },
            "scope": 1472,
            "src": "4270:292:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1377,
              "nodeType": "Block",
              "src": "5096:419:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1360,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1350,
                        "src": "5236:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1361,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "5256:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1362,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1346,
                        "src": "5279:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1363,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3504,
                          "src": "5298:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3502_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1364,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3479,
                        "src": "5298:11:5",
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
                              "id": 1356,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "5193:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1357,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3477,
                            "src": "5193:19:5",
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
                          "id": 1355,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3419,
                          "src": "5178:14:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3419_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1358,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5178:35:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3419",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1359,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3418,
                      "src": "5178:44:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1365,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5178:141:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1366,
                  "nodeType": "ExpressionStatement",
                  "src": "5178:141:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1372,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1350,
                        "src": "5452:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1348,
                        "src": "5472:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1374,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1352,
                        "src": "5489:9:5",
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
                              "id": 1368,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3504,
                              "src": "5406:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3502_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1369,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3479,
                            "src": "5406:11:5",
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
                          "id": 1367,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3469,
                          "src": "5399:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1370,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5399:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1371,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3439,
                      "src": "5399:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1375,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5399:109:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1376,
                  "nodeType": "ExpressionStatement",
                  "src": "5399:109:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 1378,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1353,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1346,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "4983:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1345,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "4983:7:5",
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
                  "id": 1348,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5006:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1347,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5006:7:5",
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
                  "id": 1350,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1349,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5027:7:5",
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
                  "id": 1352,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1378,
                  "src": "5051:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1351,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5051:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "4973:101:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1354,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5096:0:5"
            },
            "scope": 1472,
            "src": "4949:566:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1410,
              "nodeType": "Block",
              "src": "5853:437:5",
              "statements": [
                {
                  "assignments": [
                    1386
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1386,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1411,
                      "src": "5911:12:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$3469",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1385,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3469,
                        "src": "5911:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1391,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1388,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3504,
                          "src": "5933:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3502_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1389,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3479,
                        "src": "5933:11:5",
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
                      "id": 1387,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3469,
                      "src": "5926:6:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$3469_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1390,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5926:19:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$3469",
                      "typeString": "contract IVault"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "5911:34:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1395,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "6056:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1396,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "6076:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1397,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "6076:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1398,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1382,
                        "src": "6100:9:5",
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
                        "id": 1392,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1386,
                        "src": "6017:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1394,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3448,
                      "src": "6017:25:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1399,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6017:102:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1400,
                  "nodeType": "ExpressionStatement",
                  "src": "6017:102:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1404,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "6220:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1405,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 6037,
                          "src": "6240:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1406,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "6240:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1407,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1382,
                        "src": "6264:9:5",
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
                        "id": 1401,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1386,
                        "src": "6190:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3469",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1403,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3430,
                      "src": "6190:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1408,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6190:93:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1409,
                  "nodeType": "ExpressionStatement",
                  "src": "6190:93:5"
                }
              ]
            },
            "documentation": "Internal function that Withdraws a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1411,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1383,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1380,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "5784:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1379,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "5784:7:5",
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
                  "id": 1382,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1411,
                  "src": "5808:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1381,
                    "name": "uint256",
                    "nodeType": "ElementaryTypeName",
                    "src": "5808:7:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "5774:57:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1384,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5853:0:5"
            },
            "scope": 1472,
            "src": "5749:541:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1470,
              "nodeType": "Block",
              "src": "6870:611:5",
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
                        "id": 1428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1425,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1418,
                            "src": "6945:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1426,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "6945:14:5",
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
                          "id": 1427,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "6962:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "6945:18:5",
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
                      "id": 1424,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "6937:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1429,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "6937:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1430,
                  "nodeType": "ExpressionStatement",
                  "src": "6937:27:5"
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
                        "id": 1435,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1432,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1421,
                            "src": "7043:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1433,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7043:18:5",
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
                          "id": 1434,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "7064:1:5",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "7043:22:5",
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
                      "id": 1431,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "7035:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1436,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7035:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1437,
                  "nodeType": "ExpressionStatement",
                  "src": "7035:31:5"
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
                        "id": 1443,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1439,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1418,
                            "src": "7150:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1440,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7150:14:5",
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
                            "id": 1441,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1421,
                            "src": "7168:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1442,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "length",
                          "nodeType": "MemberAccess",
                          "referencedDeclaration": null,
                          "src": "7168:18:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "7150:36:5",
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
                      "id": 1438,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6040,
                        6041
                      ],
                      "referencedDeclaration": 6040,
                      "src": "7142:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1444,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "7142:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1445,
                  "nodeType": "ExpressionStatement",
                  "src": "7142:45:5"
                },
                {
                  "body": {
                    "id": 1468,
                    "nodeType": "Block",
                    "src": "7317:158:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1458,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1413,
                              "src": "7364:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1459,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1415,
                              "src": "7387:3:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1460,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1418,
                                "src": "7408:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1462,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1461,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1447,
                                "src": "7416:1:5",
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
                              "src": "7408:10:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "baseExpression": {
                                "argumentTypes": null,
                                "id": 1463,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1421,
                                "src": "7436:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1465,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1464,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1447,
                                "src": "7448:1:5",
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
                              "src": "7436:14:5",
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
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              },
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "id": 1457,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1378,
                            "src": "7331:15:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
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
                          "src": "7331:133:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1467,
                        "nodeType": "ExpressionStatement",
                        "src": "7331:133:5"
                      }
                    ]
                  },
                  "condition": {
                    "argumentTypes": null,
                    "commonType": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "id": 1453,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1450,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1447,
                      "src": "7292:1:5",
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
                        "id": 1451,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1418,
                        "src": "7296:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1452,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "length",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": null,
                      "src": "7296:14:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "7292:18:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 1469,
                  "initializationExpression": {
                    "assignments": [
                      1447
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1447,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1471,
                        "src": "7277:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1446,
                          "name": "uint256",
                          "nodeType": "ElementaryTypeName",
                          "src": "7277:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "value": null,
                        "visibility": "internal"
                      }
                    ],
                    "id": 1449,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1448,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "number",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "7289:1:5",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_rational_0_by_1",
                        "typeString": "int_const 0"
                      },
                      "value": "0"
                    },
                    "nodeType": "VariableDeclarationStatement",
                    "src": "7277:13:5"
                  },
                  "loopExpression": {
                    "expression": {
                      "argumentTypes": null,
                      "id": 1455,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "nodeType": "UnaryOperation",
                      "operator": "++",
                      "prefix": false,
                      "src": "7312:3:5",
                      "subExpression": {
                        "argumentTypes": null,
                        "id": 1454,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1447,
                        "src": "7312:1:5",
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
                    "id": 1456,
                    "nodeType": "ExpressionStatement",
                    "src": "7312:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "7272:203:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1471,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1422,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1413,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6750:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1412,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6750:7:5",
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
                  "id": 1415,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6773:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1414,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "6773:7:5",
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
                  "id": 1418,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6794:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1416,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6794:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1417,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6794:9:5",
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
                  "id": 1421,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1471,
                  "src": "6821:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1419,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "6821:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1420,
                    "length": null,
                    "nodeType": "ArrayTypeName",
                    "src": "6821:9:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_array$_t_uint256_$dyn_storage_ptr",
                      "typeString": "uint256[]"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "6740:108:5"
            },
            "payable": false,
            "returnParameters": {
              "id": 1423,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6870:0:5"
            },
            "scope": 1472,
            "src": "6711:770:5",
            "stateMutability": "nonpayable",
            "superFunction": 3313,
            "visibility": "internal"
          }
        ],
        "scope": 1473,
        "src": "1123:6360:5"
      }
    ],
    "src": "597:6887:5"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-08-22T15:29:45.013Z"
}