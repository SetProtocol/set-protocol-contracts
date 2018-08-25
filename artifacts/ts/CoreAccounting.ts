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
  "bytecode": "0x6080604052600160095534801561001557600080fd5b506109e0806100256000396000f3006080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100df5780631e912bd61461011457806330a907361461013e57806347e7ef241461016c578063559ed3391461019057806359e026f7146101f55780636e667db31461021f578063a003e06914610250578063c19d93fb1461026b578063e131243e146102a6578063f3fef3a3146102d2578063f7213db6146102f6578063fbfa77cf1461030e578063fe5b38e414610323578063fef3ee7314610338575b600080fd5b3480156100eb57600080fd5b50610100600160a060020a0360043516610359565b604080519115158252519081900360200190f35b34801561012057600080fd5b5061012c600435610377565b60408051918252519081900360200190f35b34801561014a57600080fd5b5061016a6024600480358281019290820135918135918201910135610389565b005b34801561017857600080fd5b5061016a600160a060020a036004351660243561040e565b34801561019c57600080fd5b506101a5610437565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e15781810151838201526020016101c9565b505050509050019250505060405180910390f35b34801561020157600080fd5b5061016a600160a060020a036004358116906024351660443561049c565b34801561022b57600080fd5b5061023461054e565b60408051600160a060020a039092168252519081900360200190f35b34801561025c57600080fd5b5061023460ff6004351661055d565b34801561027757600080fd5b5061028061057b565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102b257600080fd5b5061016a6024600480358281019290820135918135918201910135610591565b3480156102de57600080fd5b5061016a600160a060020a0360043516602435610627565b34801561030257600080fd5b5061012c600435610645565b34801561031a57600080fd5b50610234610657565b34801561032f57600080fd5b506101a5610666565b34801561034457600080fd5b50610100600160a060020a03600435166106c9565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60095460011461039857600080fd5b600260098190555061040333338686808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808c0282810182019093528b82529095508b94508a9350839250850190849080828437506106e7945050505050565b505060016009555050565b60095460011461041d57600080fd5b600260095561042e3380848461076a565b50506001600955565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561049257602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610474575b5050505050905090565b6009546001146104ab57600080fd5b6002600981905554604080517fb19ad577000000000000000000000000000000000000000000000000000000008152600160a060020a0386811660048301523360248301528581166044830152606482018590529151919092169163b19ad57791608480830192600092919082900301818387803b15801561052c57600080fd5b505af1158015610540573d6000803e3d6000fd5b505060016009555050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b6009546000906001146105a357600080fd5b6002600955600084116105b557600080fd5b600082116105c257600080fd5b8382146105ce57600080fd5b5060005b8381101561061b576106138585838181106105e957fe5b90506020020135600160a060020a0316848484818110151561060757fe5b90506020020135610897565b6001016105d2565b50506001600955505050565b60095460011461063657600080fd5b600260095561042e8282610897565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561049257602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610474575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b60008083511115156106f857600080fd5b815160001061070657600080fd5b815183511461071457600080fd5b5060005b82518110156107635761075b8585858481518110151561073457fe5b90602001906020020151858581518110151561074c57fe5b9060200190602002015161076a565b600101610718565b5050505050565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156107eb57600080fd5b505af11580156107ff573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152888116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b15801561087957600080fd5b505af115801561088d573d6000803e3d6000fd5b5050505050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152600160a060020a038581166004830152336024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561090e57600080fd5b505af1158015610922573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b15801561099757600080fd5b505af11580156109ab573d6000803e3d6000fd5b505050505050505600a165627a7a7230582088195c17927af81cd0fdebffe5f45bb85482363b615ce2b386ec098f0bf780260029",
  "deployedBytecode": "0x6080604052600436106100da5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630e4355d481146100df5780631e912bd61461011457806330a907361461013e57806347e7ef241461016c578063559ed3391461019057806359e026f7146101f55780636e667db31461021f578063a003e06914610250578063c19d93fb1461026b578063e131243e146102a6578063f3fef3a3146102d2578063f7213db6146102f6578063fbfa77cf1461030e578063fe5b38e414610323578063fef3ee7314610338575b600080fd5b3480156100eb57600080fd5b50610100600160a060020a0360043516610359565b604080519115158252519081900360200190f35b34801561012057600080fd5b5061012c600435610377565b60408051918252519081900360200190f35b34801561014a57600080fd5b5061016a6024600480358281019290820135918135918201910135610389565b005b34801561017857600080fd5b5061016a600160a060020a036004351660243561040e565b34801561019c57600080fd5b506101a5610437565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101e15781810151838201526020016101c9565b505050509050019250505060405180910390f35b34801561020157600080fd5b5061016a600160a060020a036004358116906024351660443561049c565b34801561022b57600080fd5b5061023461054e565b60408051600160a060020a039092168252519081900360200190f35b34801561025c57600080fd5b5061023460ff6004351661055d565b34801561027757600080fd5b5061028061057b565b60408051600160a060020a03938416815291909216602082015281519081900390910190f35b3480156102b257600080fd5b5061016a6024600480358281019290820135918135918201910135610591565b3480156102de57600080fd5b5061016a600160a060020a0360043516602435610627565b34801561030257600080fd5b5061012c600435610645565b34801561031a57600080fd5b50610234610657565b34801561032f57600080fd5b506101a5610666565b34801561034457600080fd5b50610100600160a060020a03600435166106c9565b600160a060020a031660009081526003602052604090205460ff1690565b60009081526008602052604090205490565b60095460011461039857600080fd5b600260098190555061040333338686808060200260200160405190810160405280939291908181526020018383602002808284375050604080516020808c0282810182019093528b82529095508b94508a9350839250850190849080828437506106e7945050505050565b505060016009555050565b60095460011461041d57600080fd5b600260095561042e3380848461076a565b50506001600955565b6060600060060180548060200260200160405190810160405280929190818152602001828054801561049257602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610474575b5050505050905090565b6009546001146104ab57600080fd5b6002600981905554604080517fb19ad577000000000000000000000000000000000000000000000000000000008152600160a060020a0386811660048301523360248301528581166044830152606482018590529151919092169163b19ad57791608480830192600092919082900301818387803b15801561052c57600080fd5b505af1158015610540573d6000803e3d6000fd5b505060016009555050505050565b600154600160a060020a031690565b60ff16600090815260208190526040902054600160a060020a031690565b600154600254600160a060020a03918216911682565b6009546000906001146105a357600080fd5b6002600955600084116105b557600080fd5b600082116105c257600080fd5b8382146105ce57600080fd5b5060005b8381101561061b576106138585838181106105e957fe5b90506020020135600160a060020a0316848484818110151561060757fe5b90506020020135610897565b6001016105d2565b50506001600955505050565b60095460011461063657600080fd5b600260095561042e8282610897565b60009081526007602052604090205490565b600254600160a060020a031690565b6060600060040180548060200260200160405190810160405280929190818152602001828054801561049257602002820191906000526020600020908154600160a060020a03168152600190910190602001808311610474575050505050905090565b600160a060020a031660009081526005602052604090205460ff1690565b60008083511115156106f857600080fd5b815160001061070657600080fd5b815183511461071457600080fd5b5060005b82518110156107635761075b8585858481518110151561073457fe5b90602001906020020151858581518110151561074c57fe5b9060200190602002015161076a565b600101610718565b5050505050565b600154600254604080517fa6c4e467000000000000000000000000000000000000000000000000000000008152600160a060020a03868116600483015260248201869052888116604483015292831660648201529051919092169163a6c4e46791608480830192600092919082900301818387803b1580156107eb57600080fd5b505af11580156107ff573d6000803e3d6000fd5b5050600254604080517fbada5726000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152888116602483015260448201879052915191909216935063bada57269250606480830192600092919082900301818387803b15801561087957600080fd5b505af115801561088d573d6000803e3d6000fd5b5050505050505050565b600254604080517f80ddda30000000000000000000000000000000000000000000000000000000008152600160a060020a038581166004830152336024830152604482018590529151919092169182916380ddda309160648082019260009290919082900301818387803b15801561090e57600080fd5b505af1158015610922573d6000803e3d6000fd5b5050604080517fc3b35a7e000000000000000000000000000000000000000000000000000000008152600160a060020a038781166004830152336024830152604482018790529151918516935063c3b35a7e925060648082019260009290919082900301818387803b15801561099757600080fd5b505af11580156109ab573d6000803e3d6000fd5b505050505050505600a165627a7a7230582088195c17927af81cd0fdebffe5f45bb85482363b615ce2b386ec098f0bf780260029",
  "sourceMap": "1123:6360:5:-;;;487:1:40;657:51;;1123:6360:5;8:9:-1;5:2;;;30:1;27;20:12;5:2;1123:6360:5;;;;;;;",
  "deployedSourceMap": "1123:6360:5:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2803:164:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2803:164:19;-1:-1:-1;;;;;2803:164:19;;;;;;;;;;;;;;;;;;;;;;;4385:167;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4385:167:19;;;;;;;;;;;;;;;;;;;;;2604:317:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2604:317:5;;;;;;;;;;;;;;;;;;;;;;;;;;1563:291;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1563:291:5;-1:-1:-1;;;;;1563:291:5;;;;;;;3685:119:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3685:119:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;3685:119:19;;;;;;;;;;;;;;;;;4270:292:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4270:292:5;-1:-1:-1;;;;;4270:292:5;;;;;;;;;;;;2263:125:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2263:125:19;;;;;;;;-1:-1:-1;;;;;2263:125:19;;;;;;;;;;;;;;1985:161;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1985:161:19;;;;;;;1710:18;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1710:18:19;;;;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;;;;;;;;;;;;;;;;;;;3240:689:5;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3240:689:5;;;;;;;;;;;;;;;;;;;;;;;;2064:203;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2064:203:5;-1:-1:-1;;;;;2064:203:5;;;;;;;4011:163:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4011:163:19;;;;;2489:109;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2489:109:19;;;;3099:119;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3099:119:19;;;;3409:146;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3409:146:19;-1:-1:-1;;;;;3409:146:19;;;;;2803:164;-1:-1:-1;;;;;2930:30:19;2903:4;2930:30;;;:20;:30;;;;;;;;;2803:164::o;4385:167::-;4485:7;4515:30;;;:18;:30;;;;;;;4385:167::o;2604:317:5:-;1128:14:40;;487:1;1128:39;1120:48;;;;;;584:1;1174:14;:40;;;;2790:124:5;2824:10;2848;2872:7;;2790:124;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;2790:124:5;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2893:11:5;;-1:-1:-1;2893:11:5;;-1:-1:-1;2893:11:5;;-1:-1:-1;2790:124:5;;;2893:11;;2790:124;2893:11;2790:124;;-1:-1:-1;2790:20:5;;-1:-1:-1;;;;;2790:124:5:i;:::-;-1:-1:-1;;487:1:40;1227:14;:38;-1:-1:-1;;2604:317:5:o;1563:291::-;1128:14:40;;487:1;1128:39;1120:48;;;;;;584:1;1174:14;:40;1731:116:5;1760:10;;1808:6;1828:9;1731:15;:116::i;:::-;-1:-1:-1;;487:1:40;1227:14;:38;1563:291:5:o;3685:119:19:-;3750:9;3782:5;:15;;3775:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3775:22:19;;;;;;;;;;;;;;;;;;;;;;;3685:119;:::o;4270:292:5:-;1128:14:40;;487:1;1128:39;1120:48;;;;;;584:1;1174:14;:40;;;4433:11:5;4426:129;;;;;;-1:-1:-1;;;;;4426:129:5;;;;;;;4492:10;4426:129;;;;;;;;;;;;;;;;;;;4433:11;;;;;4426:35;;:129;;;;;4433:5;;4426:129;;;;;;;4433:5;:11;4426:129;;;5:2:-1;;;;30:1;27;20:12;5:2;4426:129:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;487:1:40;1227:14;:38;-1:-1:-1;;;;;4270:292:5:o;2263:125:19:-;2362:19;;-1:-1:-1;;;;;2362:19:19;2263:125;:::o;1985:161::-;2111:28;;2081:7;2111:28;;;;;;;;;;;-1:-1:-1;;;;;2111:28:19;;1985:161::o;1710:18::-;;;;;-1:-1:-1;;;;;1710:18:19;;;;;;:::o;3240:689:5:-;1128:14:40;;3768:9:5;;487:1:40;1128:39;1120:48;;;;;;584:1;1174:14;:40;3460:1:5;3443:18;;3435:27;;;;;;3562:1;3541:22;;3533:31;;;;;;3648:36;;;3640:45;;;;;;-1:-1:-1;3780:1:5;3763:160;3783:18;;;3763:160;;;3822:90;3856:7;;3864:1;3856:10;;;;;;;;;;;;;-1:-1:-1;;;;;3856:10:5;3884:11;;3896:1;3884:14;;;;;;;;;;;;;;;3822:16;:90::i;:::-;3803:3;;3763:160;;;-1:-1:-1;;487:1:40;1227:14;:38;-1:-1:-1;;;3240:689:5:o;2064:203::-;1128:14:40;;487:1;1128:39;1120:48;;;;;;584:1;1174:14;:40;2191:69:5;2221:6;2241:9;2191:16;:69::i;4011:163:19:-;4109:7;4139:28;;;:16;:28;;;;;;;4011:163::o;2489:109::-;2580:11;;-1:-1:-1;;;;;2580:11:19;2489:109;:::o;3099:119::-;3164:9;3196:5;:15;;3189:22;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;3189:22:19;;;;;;;;;;;;;;;;;;;;;;3099:119;:::o;3409:146::-;-1:-1:-1;;;;;3527:21:19;3500:4;3527:21;;;:15;:21;;;;;;;;;3409:146::o;6711:770:5:-;7277:9;6962:1;6945:7;:14;:18;6937:27;;;;;;;;7043:18;;7064:1;-1:-1:-1;7035:31:5;;;;;;7168:18;;7150:14;;:36;7142:45;;;;;;-1:-1:-1;7289:1:5;7272:203;7296:7;:14;7292:1;:18;7272:203;;;7331:133;7364:5;7387:3;7408:7;7416:1;7408:10;;;;;;;;;;;;;;;;;;7436:11;7448:1;7436:14;;;;;;;;;;;;;;;;;;7331:15;:133::i;:::-;7312:3;;7272:203;;;6711:770;;;;;:::o;4949:566::-;5193:19;;5298:11;;5178:141;;;;;;-1:-1:-1;;;;;5178:141:5;;;;;;;;;;;;;;;;;;;;5298:11;;;5178:141;;;;;;5193:19;;;;;5178:44;;:141;;;;;5193:5;;5178:141;;;;;;;5193:5;:19;5178:141;;;5:2:-1;;;;30:1;27;20:12;5:2;5178:141:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;5406:11:5;;5399:109;;;;;;-1:-1:-1;;;;;5399:109:5;;;;;;;;;;;;;;;;;;;;;;5406:11;;;;;-1:-1:-1;5399:39:5;;-1:-1:-1;5399:109:5;;;;;5406:5;;5399:109;;;;;;;5406:5;:11;5399:109;;;5:2:-1;;;;30:1;27;20:12;5:2;5399:109:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;5399:109:5;;;;4949:566;;;;:::o;5749:541::-;5933:11;;6017:102;;;;;;-1:-1:-1;;;;;6017:102:5;;;;;;;6076:10;6017:102;;;;;;;;;;;;5933:11;;;;;;;6017:25;;:102;;;;;5911:12;;6017:102;;;;;;;;5911:12;5933:11;6017:102;;;5:2:-1;;;;30:1;27;20:12;5:2;6017:102:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;6190:93:5;;;;;;-1:-1:-1;;;;;6190:93:5;;;;;;;6240:10;6190:93;;;;;;;;;;;;:16;;;;-1:-1:-1;6190:16:5;;-1:-1:-1;6190:93:5;;;;;-1:-1:-1;;6190:93:5;;;;;;;;-1:-1:-1;6190:16:5;:93;;;5:2:-1;;;;30:1;27;20:12;5:2;6190:93:5;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;6190:93:5;;;;5749:541;;;:::o",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\nimport { ReentrancyGuard } from \"zeppelin-solidity/contracts/ReentrancyGuard.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { CoreState } from \"../lib/CoreState.sol\";\nimport { ITransferProxy } from \"../interfaces/ITransferProxy.sol\";\nimport { IVault } from \"../interfaces/IVault.sol\";\n\n\n/**\n * @title Core Accounting\n * @author Set Protocol\n *\n * The CoreAccounting contract interfaces with the vault and transfer proxies\n * for storage of tokenized assets\n */\ncontract CoreAccounting is\n    CoreState,\n    ReentrancyGuard\n{\n    // Use SafeMath library for all uint256 arithmetic\n    using SafeMath for uint256;\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault and attribute to sender.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function deposit(\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        // Call internal deposit function\n        depositInternal(\n            msg.sender,\n            msg.sender,\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Withdraw a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdraw(\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        withdrawInternal(\n            _token,\n            _quantity\n        );\n    }\n\n    /**\n     * Deposit multiple tokens to the vault and attribute to sender.\n     * Quantities should be in the order of the addresses of the tokens being deposited.\n     *\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n     * @param  _quantities       Array of the number of tokens to deposit\n     */\n    function batchDeposit(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external\n        nonReentrant\n    {\n        // Call internal batch deposit function\n        batchDepositInternal(\n            msg.sender,\n            msg.sender,\n            _tokens,\n            _quantities\n        );\n    }\n\n    /**\n     * Withdraw multiple tokens from the vault. Quantities should be in the\n     * order of the addresses of the tokens being withdrawn.\n     *\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n     * @param  _quantities        Array of the number of tokens to withdraw\n     */\n    function batchWithdraw(\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        external\n        nonReentrant\n    {\n        // Confirm an empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run withdraw function\n        for (uint256 i = 0; i < _tokens.length; i++) {\n            withdrawInternal(\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n\n    /**\n     * Sender can transfer tokens associated with their account in Vault to\n     * another users account in vault\n     *\n     * @param  _to             Address token being transferred to\n     * @param  _token          Address of token being transferred\n     * @param  _quantity       Amount of tokens being transferred\n     */\n    function internalTransfer(\n        address _to,\n        address _token,\n        uint256 _quantity\n    )\n        external\n        nonReentrant\n    {\n        IVault(state.vault).transferBalance(\n            _to,\n            msg.sender,\n            _token,\n            _quantity\n        );\n    }\n\n    /* ============ Internal Functions ============ */\n\n    /**\n     * Deposit any quantity of tokens into the vault.\n     *\n     * @param  _from            Address depositing token\n     * @param  _to              Address to credit for deposit\n     * @param  _token           Address of token being deposited\n     * @param  _quantity        The number of tokens to deposit\n     */\n    function depositInternal(\n        address _from,\n        address _to,\n        address _token,\n        uint256 _quantity\n    )\n        internal\n    {\n        // Call TransferProxy contract to transfer user tokens to Vault\n        ITransferProxy(state.transferProxy).transfer(\n            _token,\n            _quantity,\n            _from,\n            state.vault\n        );\n\n        // Call Vault contract to attribute deposited tokens to user\n        IVault(state.vault).incrementTokenOwner(\n            _token,\n            _to,\n            _quantity\n        );\n    }\n\n    /**\n     * Internal function that Withdraws a quantity of tokens from the vault.\n     *\n     * @param  _token           The address of the ERC20 token\n     * @param  _quantity        The number of tokens to withdraw\n     */\n    function withdrawInternal(\n        address _token,\n        uint256 _quantity\n    )\n        internal\n    {\n        // Declare interface variavle for vault\n        IVault vault = IVault(state.vault);\n\n        // Call Vault contract to deattribute tokens to user\n        vault.decrementTokenOwner(\n            _token,\n            msg.sender,\n            _quantity\n        );\n\n        // Call Vault to withdraw tokens from Vault to user\n        vault.withdrawTo(\n            _token,\n            msg.sender,\n            _quantity\n        );\n    }\n\n\n    /**\n     * Deposit multiple tokens to the vault. Quantities should be in the\n     * order of the addresses of the tokens being deposited.\n     *\n     * @param  _from            Address depositing tokens\n     * @param  _to              Address to credit for deposits\n     * @param  _tokens          Addresses of tokens being deposited\n     * @param  _quantities      The quantities of tokens to deposit\n     */\n    function batchDepositInternal(\n        address _from,\n        address _to,\n        address[] _tokens,\n        uint256[] _quantities\n    )\n        internal\n    {\n        // Confirm and empty _tokens array is not passed\n        require(_tokens.length > 0);\n\n        // Confirm an empty _quantities array is not passed\n        require(_quantities.length > 0);\n\n        // Confirm there is one quantity for every token address\n        require(_tokens.length == _quantities.length);\n\n        // For each token and quantity pair, run depositInternal function\n        for (uint256 i = 0; i < _tokens.length; i++) {\n            depositInternal(\n                _from,\n                _to,\n                _tokens[i],\n                _quantities[i]\n            );\n        }\n    }\n}\n",
  "sourcePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
  "ast": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1606
      ]
    },
    "id": 1607,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1326,
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
        "id": 1328,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 6353,
        "src": "622:82:5",
        "symbolAliases": [
          {
            "foreign": 1327,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1330,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 6518,
        "src": "705:73:5",
        "symbolAliases": [
          {
            "foreign": 1329,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1332,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3750,
        "src": "779:49:5",
        "symbolAliases": [
          {
            "foreign": 1331,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1334,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3561,
        "src": "829:66:5",
        "symbolAliases": [
          {
            "foreign": 1333,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1336,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3611,
        "src": "896:50:5",
        "symbolAliases": [
          {
            "foreign": 1335,
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
              "id": 1337,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3749,
              "src": "1154:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3749",
                "typeString": "contract CoreState"
              }
            },
            "id": 1338,
            "nodeType": "InheritanceSpecifier",
            "src": "1154:9:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1339,
              "name": "ReentrancyGuard",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6352,
              "src": "1169:15:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ReentrancyGuard_$6352",
                "typeString": "contract ReentrancyGuard"
              }
            },
            "id": 1340,
            "nodeType": "InheritanceSpecifier",
            "src": "1169:15:5"
          }
        ],
        "contractDependencies": [
          3749,
          6352
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1606,
        "linearizedBaseContracts": [
          1606,
          6352,
          3749
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1343,
            "libraryName": {
              "contractScope": null,
              "id": 1341,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6517,
              "src": "1252:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6517",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1246:27:5",
            "typeName": {
              "id": 1342,
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
              "id": 1361,
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
                          "id": 1353,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "1760:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1354,
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
                          "id": 1355,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "1784:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1356,
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
                        "id": 1357,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1345,
                        "src": "1808:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1358,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1347,
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
                      "id": 1352,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1512,
                      "src": "1731:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 1359,
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
                  "id": 1360,
                  "nodeType": "ExpressionStatement",
                  "src": "1731:116:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1362,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1350,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1349,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1345,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1362,
                  "src": "1589:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1344,
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
                  "id": 1347,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1362,
                  "src": "1613:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1346,
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
              "id": 1351,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1679:0:5"
            },
            "scope": 1606,
            "src": "1563:291:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1376,
              "nodeType": "Block",
              "src": "2181:86:5",
              "statements": [
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
                        "referencedDeclaration": 1364,
                        "src": "2221:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1366,
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
                      "id": 1371,
                      "name": "withdrawInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1545,
                      "src": "2191:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 1374,
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
                  "id": 1375,
                  "nodeType": "ExpressionStatement",
                  "src": "2191:69:5"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1377,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1369,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1368,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1367,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1364,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1377,
                  "src": "2091:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1363,
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
                  "id": 1366,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1377,
                  "src": "2115:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1365,
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
              "id": 1370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:5"
            },
            "scope": 1606,
            "src": "2064:203:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1397,
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
                          "id": 1389,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "2824:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1390,
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
                          "id": 1391,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "2848:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1392,
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
                        "id": 1393,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "2872:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1394,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1383,
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
                      "id": 1388,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1605,
                      "src": "2790:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 1395,
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
                  "id": 1396,
                  "nodeType": "ExpressionStatement",
                  "src": "2790:124:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1398,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1386,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1385,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1380,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1398,
                  "src": "2635:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1378,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2635:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1379,
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
                  "id": 1383,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1398,
                  "src": "2662:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1381,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2662:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1382,
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
              "id": 1387,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2732:0:5"
            },
            "scope": 1606,
            "src": "2604:317:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1453,
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
                        "id": 1413,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1410,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1401,
                            "src": "3443:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1411,
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
                          "id": 1412,
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
                      "id": 1409,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3435:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1414,
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
                  "id": 1415,
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
                        "id": 1420,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1417,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1404,
                            "src": "3541:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1418,
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
                          "id": 1419,
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
                      "id": 1416,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3533:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
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
                    "src": "3533:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1422,
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
                        "id": 1428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1424,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1401,
                            "src": "3648:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1425,
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
                            "id": 1426,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1404,
                            "src": "3666:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1427,
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
                      "id": 1423,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3640:7:5",
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
                    "src": "3640:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1430,
                  "nodeType": "ExpressionStatement",
                  "src": "3640:45:5"
                },
                {
                  "body": {
                    "id": 1451,
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
                                "id": 1443,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1401,
                                "src": "3856:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1445,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1444,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1432,
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
                                "id": 1446,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3884:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1448,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1447,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1432,
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
                            "id": 1442,
                            "name": "withdrawInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1545,
                            "src": "3822:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
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
                          "src": "3822:90:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1450,
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
                    "id": 1438,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1435,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1432,
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
                        "id": 1436,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1401,
                        "src": "3787:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1437,
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
                  "id": 1452,
                  "initializationExpression": {
                    "assignments": [
                      1432
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1432,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1454,
                        "src": "3768:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1431,
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
                    "id": 1434,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1433,
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
                      "id": 1440,
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
                        "id": 1439,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1432,
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
                    "id": 1441,
                    "nodeType": "ExpressionStatement",
                    "src": "3803:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "3763:160:5"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1454,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1407,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1406,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1405,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1401,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1454,
                  "src": "3272:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1399,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3272:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1400,
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
                  "id": 1404,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1454,
                  "src": "3299:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1402,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3299:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1403,
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
              "id": 1408,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:5"
            },
            "scope": 1606,
            "src": "3240:689:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1477,
              "nodeType": "Block",
              "src": "4416:146:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1470,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1456,
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
                          "id": 1471,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "4492:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1472,
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
                        "id": 1473,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1458,
                        "src": "4516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1474,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1460,
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
                              "id": 1466,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "4433:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1467,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3620,
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
                          "id": 1465,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3610,
                          "src": "4426:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1468,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4426:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferBalance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3600,
                      "src": "4426:35:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256) external"
                      }
                    },
                    "id": 1475,
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
                  "id": 1476,
                  "nodeType": "ExpressionStatement",
                  "src": "4426:129:5"
                }
              ]
            },
            "documentation": "Sender can transfer tokens associated with their account in Vault to\nanother users account in vault\n     * @param  _to             Address token being transferred to\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 1478,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1463,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1462,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1456,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4305:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1455,
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
                  "id": 1458,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4326:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1457,
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
                  "id": 1460,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4350:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1459,
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
              "id": 1464,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4416:0:5"
            },
            "scope": 1606,
            "src": "4270:292:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1511,
              "nodeType": "Block",
              "src": "5096:419:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1494,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "5236:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1495,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1486,
                        "src": "5256:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1496,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1480,
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
                          "id": 1497,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "5298:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1498,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3620,
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
                              "id": 1490,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "5193:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1491,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3618,
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
                          "id": 1489,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3560,
                          "src": "5178:14:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3560_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1492,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5178:35:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3560",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1493,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3559,
                      "src": "5178:44:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1499,
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
                  "id": 1500,
                  "nodeType": "ExpressionStatement",
                  "src": "5178:141:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1506,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "5452:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1507,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1482,
                        "src": "5472:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1508,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1486,
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
                              "id": 1502,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "5406:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1503,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3620,
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
                          "id": 1501,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3610,
                          "src": "5399:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1504,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5399:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1505,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3580,
                      "src": "5399:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1509,
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
                  "id": 1510,
                  "nodeType": "ExpressionStatement",
                  "src": "5399:109:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 1512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1487,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1480,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "4983:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1479,
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
                  "id": 1482,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5006:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1481,
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
                  "id": 1484,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1483,
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
                  "id": 1486,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5051:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1485,
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
              "id": 1488,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5096:0:5"
            },
            "scope": 1606,
            "src": "4949:566:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1544,
              "nodeType": "Block",
              "src": "5853:437:5",
              "statements": [
                {
                  "assignments": [
                    1520
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1520,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1545,
                      "src": "5911:12:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$3610",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1519,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3610,
                        "src": "5911:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1525,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1522,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "5933:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1523,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3620,
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
                      "id": 1521,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3610,
                      "src": "5926:6:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1524,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5926:19:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$3610",
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
                        "id": 1529,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1514,
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
                          "id": 1530,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "6076:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1531,
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
                        "id": 1532,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1516,
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
                        "id": 1526,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "6017:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1528,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3589,
                      "src": "6017:25:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1533,
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
                  "id": 1534,
                  "nodeType": "ExpressionStatement",
                  "src": "6017:102:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1538,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1514,
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
                          "id": 1539,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "6240:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1540,
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
                        "id": 1541,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1516,
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
                        "id": 1535,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "6190:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1537,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3571,
                      "src": "6190:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1542,
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
                  "id": 1543,
                  "nodeType": "ExpressionStatement",
                  "src": "6190:93:5"
                }
              ]
            },
            "documentation": "Internal function that Withdraws a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1545,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1517,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1514,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1545,
                  "src": "5784:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1513,
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
                  "id": 1516,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1545,
                  "src": "5808:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1515,
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
              "id": 1518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5853:0:5"
            },
            "scope": 1606,
            "src": "5749:541:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1604,
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
                        "id": 1562,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1559,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1552,
                            "src": "6945:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1560,
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
                          "id": 1561,
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
                      "id": 1558,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "6937:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
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
                    "src": "6937:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1564,
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
                        "id": 1569,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1566,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1555,
                            "src": "7043:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1567,
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
                          "id": 1568,
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
                      "id": 1565,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "7035:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1570,
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
                  "id": 1571,
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
                        "id": 1577,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1573,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1552,
                            "src": "7150:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1574,
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
                            "id": 1575,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1555,
                            "src": "7168:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1576,
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
                      "id": 1572,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "7142:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1578,
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
                  "id": 1579,
                  "nodeType": "ExpressionStatement",
                  "src": "7142:45:5"
                },
                {
                  "body": {
                    "id": 1602,
                    "nodeType": "Block",
                    "src": "7317:158:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1592,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1547,
                              "src": "7364:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1593,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1549,
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
                                "id": 1594,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1552,
                                "src": "7408:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1596,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1595,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1581,
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
                                "id": 1597,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1555,
                                "src": "7436:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1599,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1598,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1581,
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
                            "id": 1591,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1512,
                            "src": "7331:15:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
                            }
                          },
                          "id": 1600,
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
                        "id": 1601,
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
                    "id": 1587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1584,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1581,
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
                        "id": 1585,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1552,
                        "src": "7296:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1586,
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
                  "id": 1603,
                  "initializationExpression": {
                    "assignments": [
                      1581
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1581,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1605,
                        "src": "7277:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1580,
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
                    "id": 1583,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1582,
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
                      "id": 1589,
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
                        "id": 1588,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
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
                    "id": 1590,
                    "nodeType": "ExpressionStatement",
                    "src": "7312:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "7272:203:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1605,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1556,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1547,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6750:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1546,
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
                  "id": 1549,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6773:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1548,
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
                  "id": 1552,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6794:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1550,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6794:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1551,
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
                  "id": 1555,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6821:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1553,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "6821:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1554,
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
              "id": 1557,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6870:0:5"
            },
            "scope": 1606,
            "src": "6711:770:5",
            "stateMutability": "nonpayable",
            "superFunction": 3454,
            "visibility": "internal"
          }
        ],
        "scope": 1607,
        "src": "1123:6360:5"
      }
    ],
    "src": "597:6887:5"
  },
  "legacyAST": {
    "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/extensions/CoreAccounting.sol",
    "exportedSymbols": {
      "CoreAccounting": [
        1606
      ]
    },
    "id": 1607,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1326,
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
        "id": 1328,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 6353,
        "src": "622:82:5",
        "symbolAliases": [
          {
            "foreign": 1327,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 1330,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 6518,
        "src": "705:73:5",
        "symbolAliases": [
          {
            "foreign": 1329,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/lib/CoreState.sol",
        "file": "../lib/CoreState.sol",
        "id": 1332,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3750,
        "src": "779:49:5",
        "symbolAliases": [
          {
            "foreign": 1331,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/ITransferProxy.sol",
        "file": "../interfaces/ITransferProxy.sol",
        "id": 1334,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3561,
        "src": "829:66:5",
        "symbolAliases": [
          {
            "foreign": 1333,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/justinkchen/workspace/set-protocol-contracts/contracts/core/interfaces/IVault.sol",
        "file": "../interfaces/IVault.sol",
        "id": 1336,
        "nodeType": "ImportDirective",
        "scope": 1607,
        "sourceUnit": 3611,
        "src": "896:50:5",
        "symbolAliases": [
          {
            "foreign": 1335,
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
              "id": 1337,
              "name": "CoreState",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 3749,
              "src": "1154:9:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_CoreState_$3749",
                "typeString": "contract CoreState"
              }
            },
            "id": 1338,
            "nodeType": "InheritanceSpecifier",
            "src": "1154:9:5"
          },
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1339,
              "name": "ReentrancyGuard",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6352,
              "src": "1169:15:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_ReentrancyGuard_$6352",
                "typeString": "contract ReentrancyGuard"
              }
            },
            "id": 1340,
            "nodeType": "InheritanceSpecifier",
            "src": "1169:15:5"
          }
        ],
        "contractDependencies": [
          3749,
          6352
        ],
        "contractKind": "contract",
        "documentation": "@title Core Accounting\n@author Set Protocol\n * The CoreAccounting contract interfaces with the vault and transfer proxies\nfor storage of tokenized assets",
        "fullyImplemented": true,
        "id": 1606,
        "linearizedBaseContracts": [
          1606,
          6352,
          3749
        ],
        "name": "CoreAccounting",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1343,
            "libraryName": {
              "contractScope": null,
              "id": 1341,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6517,
              "src": "1252:8:5",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6517",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1246:27:5",
            "typeName": {
              "id": 1342,
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
              "id": 1361,
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
                          "id": 1353,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "1760:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1354,
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
                          "id": 1355,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "1784:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1356,
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
                        "id": 1357,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1345,
                        "src": "1808:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1358,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1347,
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
                      "id": 1352,
                      "name": "depositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1512,
                      "src": "1731:15:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 1359,
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
                  "id": 1360,
                  "nodeType": "ExpressionStatement",
                  "src": "1731:116:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault and attribute to sender.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to deposit",
            "id": 1362,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1350,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1349,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1348,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1345,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1362,
                  "src": "1589:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1344,
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
                  "id": 1347,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1362,
                  "src": "1613:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1346,
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
              "id": 1351,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1679:0:5"
            },
            "scope": 1606,
            "src": "1563:291:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1376,
              "nodeType": "Block",
              "src": "2181:86:5",
              "statements": [
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
                        "referencedDeclaration": 1364,
                        "src": "2221:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1373,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1366,
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
                      "id": 1371,
                      "name": "withdrawInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1545,
                      "src": "2191:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,uint256)"
                      }
                    },
                    "id": 1374,
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
                  "id": 1375,
                  "nodeType": "ExpressionStatement",
                  "src": "2191:69:5"
                }
              ]
            },
            "documentation": "Withdraw a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1377,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1369,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1368,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1367,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1364,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1377,
                  "src": "2091:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1363,
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
                  "id": 1366,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1377,
                  "src": "2115:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1365,
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
              "id": 1370,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2181:0:5"
            },
            "scope": 1606,
            "src": "2064:203:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1397,
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
                          "id": 1389,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "2824:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1390,
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
                          "id": 1391,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "2848:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1392,
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
                        "id": 1393,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1380,
                        "src": "2872:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1394,
                        "name": "_quantities",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1383,
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
                      "id": 1388,
                      "name": "batchDepositInternal",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1605,
                      "src": "2790:20:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_array$_t_address_$dyn_memory_ptr_$_t_array$_t_uint256_$dyn_memory_ptr_$returns$__$",
                        "typeString": "function (address,address,address[] memory,uint256[] memory)"
                      }
                    },
                    "id": 1395,
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
                  "id": 1396,
                  "nodeType": "ExpressionStatement",
                  "src": "2790:124:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault and attribute to sender.\nQuantities should be in the order of the addresses of the tokens being deposited.\n     * @param  _tokens           Array of the addresses of the ERC20 tokens\n@param  _quantities       Array of the number of tokens to deposit",
            "id": 1398,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1386,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1385,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1384,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1380,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1398,
                  "src": "2635:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1378,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "2635:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1379,
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
                  "id": 1383,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1398,
                  "src": "2662:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1381,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "2662:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1382,
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
              "id": 1387,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "2732:0:5"
            },
            "scope": 1606,
            "src": "2604:317:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1453,
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
                        "id": 1413,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1410,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1401,
                            "src": "3443:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1411,
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
                          "id": 1412,
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
                      "id": 1409,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3435:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1414,
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
                  "id": 1415,
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
                        "id": 1420,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1417,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1404,
                            "src": "3541:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1418,
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
                          "id": 1419,
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
                      "id": 1416,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3533:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
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
                    "src": "3533:31:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1422,
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
                        "id": 1428,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1424,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1401,
                            "src": "3648:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                              "typeString": "address[] calldata"
                            }
                          },
                          "id": 1425,
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
                            "id": 1426,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1404,
                            "src": "3666:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                              "typeString": "uint256[] calldata"
                            }
                          },
                          "id": 1427,
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
                      "id": 1423,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "3640:7:5",
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
                    "src": "3640:45:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1430,
                  "nodeType": "ExpressionStatement",
                  "src": "3640:45:5"
                },
                {
                  "body": {
                    "id": 1451,
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
                                "id": 1443,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1401,
                                "src": "3856:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                                  "typeString": "address[] calldata"
                                }
                              },
                              "id": 1445,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1444,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1432,
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
                                "id": 1446,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1404,
                                "src": "3884:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                                  "typeString": "uint256[] calldata"
                                }
                              },
                              "id": 1448,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1447,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1432,
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
                            "id": 1442,
                            "name": "withdrawInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1545,
                            "src": "3822:16:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,uint256)"
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
                          "src": "3822:90:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_tuple$__$",
                            "typeString": "tuple()"
                          }
                        },
                        "id": 1450,
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
                    "id": 1438,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1435,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1432,
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
                        "id": 1436,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1401,
                        "src": "3787:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                          "typeString": "address[] calldata"
                        }
                      },
                      "id": 1437,
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
                  "id": 1452,
                  "initializationExpression": {
                    "assignments": [
                      1432
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1432,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1454,
                        "src": "3768:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1431,
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
                    "id": 1434,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1433,
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
                      "id": 1440,
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
                        "id": 1439,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1432,
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
                    "id": 1441,
                    "nodeType": "ExpressionStatement",
                    "src": "3803:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "3763:160:5"
                }
              ]
            },
            "documentation": "Withdraw multiple tokens from the vault. Quantities should be in the\norder of the addresses of the tokens being withdrawn.\n     * @param  _tokens            Array of the addresses of the ERC20 tokens\n@param  _quantities        Array of the number of tokens to withdraw",
            "id": 1454,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1407,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1406,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1405,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1401,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1454,
                  "src": "3272:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_calldata_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1399,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "3272:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1400,
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
                  "id": 1404,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1454,
                  "src": "3299:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_calldata_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1402,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "3299:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1403,
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
              "id": 1408,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "3369:0:5"
            },
            "scope": 1606,
            "src": "3240:689:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1477,
              "nodeType": "Block",
              "src": "4416:146:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1470,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1456,
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
                          "id": 1471,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "4492:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1472,
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
                        "id": 1473,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1458,
                        "src": "4516:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1474,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1460,
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
                              "id": 1466,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "4433:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1467,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3620,
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
                          "id": 1465,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3610,
                          "src": "4426:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1468,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "4426:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1469,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferBalance",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3600,
                      "src": "4426:35:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256) external"
                      }
                    },
                    "id": 1475,
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
                  "id": 1476,
                  "nodeType": "ExpressionStatement",
                  "src": "4426:129:5"
                }
              ]
            },
            "documentation": "Sender can transfer tokens associated with their account in Vault to\nanother users account in vault\n     * @param  _to             Address token being transferred to\n@param  _token          Address of token being transferred\n@param  _quantity       Amount of tokens being transferred",
            "id": 1478,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 1463,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 1462,
                  "name": "nonReentrant",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 6351,
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
              "id": 1461,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1456,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4305:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1455,
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
                  "id": 1458,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4326:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1457,
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
                  "id": 1460,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1478,
                  "src": "4350:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1459,
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
              "id": 1464,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "4416:0:5"
            },
            "scope": 1606,
            "src": "4270:292:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          },
          {
            "body": {
              "id": 1511,
              "nodeType": "Block",
              "src": "5096:419:5",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1494,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "5236:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1495,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1486,
                        "src": "5256:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1496,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1480,
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
                          "id": 1497,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "5298:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1498,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3620,
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
                              "id": 1490,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "5193:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1491,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "transferProxy",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3618,
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
                          "id": 1489,
                          "name": "ITransferProxy",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3560,
                          "src": "5178:14:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_ITransferProxy_$3560_$",
                            "typeString": "type(contract ITransferProxy)"
                          }
                        },
                        "id": 1492,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5178:35:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_ITransferProxy_$3560",
                          "typeString": "contract ITransferProxy"
                        }
                      },
                      "id": 1493,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3559,
                      "src": "5178:44:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_uint256_$_t_address_$_t_address_$returns$__$",
                        "typeString": "function (address,uint256,address,address) external"
                      }
                    },
                    "id": 1499,
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
                  "id": 1500,
                  "nodeType": "ExpressionStatement",
                  "src": "5178:141:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1506,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1484,
                        "src": "5452:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1507,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1482,
                        "src": "5472:3:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 1508,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1486,
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
                              "id": 1502,
                              "name": "state",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 3645,
                              "src": "5406:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_struct$_State_$3643_storage",
                                "typeString": "struct CoreState.State storage ref"
                              }
                            },
                            "id": 1503,
                            "isConstant": false,
                            "isLValue": true,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "vault",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 3620,
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
                          "id": 1501,
                          "name": "IVault",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3610,
                          "src": "5399:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                            "typeString": "type(contract IVault)"
                          }
                        },
                        "id": 1504,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "kind": "typeConversion",
                        "lValueRequested": false,
                        "names": [],
                        "nodeType": "FunctionCall",
                        "src": "5399:19:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1505,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "incrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3580,
                      "src": "5399:39:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1509,
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
                  "id": 1510,
                  "nodeType": "ExpressionStatement",
                  "src": "5399:109:5"
                }
              ]
            },
            "documentation": "Deposit any quantity of tokens into the vault.\n     * @param  _from            Address depositing token\n@param  _to              Address to credit for deposit\n@param  _token           Address of token being deposited\n@param  _quantity        The number of tokens to deposit",
            "id": 1512,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "depositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1487,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1480,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "4983:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1479,
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
                  "id": 1482,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5006:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1481,
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
                  "id": 1484,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5027:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1483,
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
                  "id": 1486,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1512,
                  "src": "5051:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1485,
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
              "id": 1488,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5096:0:5"
            },
            "scope": 1606,
            "src": "4949:566:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1544,
              "nodeType": "Block",
              "src": "5853:437:5",
              "statements": [
                {
                  "assignments": [
                    1520
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 1520,
                      "name": "vault",
                      "nodeType": "VariableDeclaration",
                      "scope": 1545,
                      "src": "5911:12:5",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_contract$_IVault_$3610",
                        "typeString": "contract IVault"
                      },
                      "typeName": {
                        "contractScope": null,
                        "id": 1519,
                        "name": "IVault",
                        "nodeType": "UserDefinedTypeName",
                        "referencedDeclaration": 3610,
                        "src": "5911:6:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 1525,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1522,
                          "name": "state",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 3645,
                          "src": "5933:5:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_struct$_State_$3643_storage",
                            "typeString": "struct CoreState.State storage ref"
                          }
                        },
                        "id": 1523,
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "vault",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": 3620,
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
                      "id": 1521,
                      "name": "IVault",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3610,
                      "src": "5926:6:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_type$_t_contract$_IVault_$3610_$",
                        "typeString": "type(contract IVault)"
                      }
                    },
                    "id": 1524,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "typeConversion",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "5926:19:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_contract$_IVault_$3610",
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
                        "id": 1529,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1514,
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
                          "id": 1530,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "6076:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1531,
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
                        "id": 1532,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1516,
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
                        "id": 1526,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "6017:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1528,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "decrementTokenOwner",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3589,
                      "src": "6017:25:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1533,
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
                  "id": 1534,
                  "nodeType": "ExpressionStatement",
                  "src": "6017:102:5"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 1538,
                        "name": "_token",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1514,
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
                          "id": 1539,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 7070,
                          "src": "6240:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1540,
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
                        "id": 1541,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1516,
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
                        "id": 1535,
                        "name": "vault",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1520,
                        "src": "6190:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_contract$_IVault_$3610",
                          "typeString": "contract IVault"
                        }
                      },
                      "id": 1537,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "withdrawTo",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 3571,
                      "src": "6190:16:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_external_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,uint256) external"
                      }
                    },
                    "id": 1542,
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
                  "id": 1543,
                  "nodeType": "ExpressionStatement",
                  "src": "6190:93:5"
                }
              ]
            },
            "documentation": "Internal function that Withdraws a quantity of tokens from the vault.\n     * @param  _token           The address of the ERC20 token\n@param  _quantity        The number of tokens to withdraw",
            "id": 1545,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "withdrawInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1517,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1514,
                  "name": "_token",
                  "nodeType": "VariableDeclaration",
                  "scope": 1545,
                  "src": "5784:14:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1513,
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
                  "id": 1516,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 1545,
                  "src": "5808:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 1515,
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
              "id": 1518,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "5853:0:5"
            },
            "scope": 1606,
            "src": "5749:541:5",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "internal"
          },
          {
            "body": {
              "id": 1604,
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
                        "id": 1562,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1559,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1552,
                            "src": "6945:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1560,
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
                          "id": 1561,
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
                      "id": 1558,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "6937:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
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
                    "src": "6937:27:5",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 1564,
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
                        "id": 1569,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1566,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1555,
                            "src": "7043:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1567,
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
                          "id": 1568,
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
                      "id": 1565,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "7035:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1570,
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
                  "id": 1571,
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
                        "id": 1577,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "expression": {
                            "argumentTypes": null,
                            "id": 1573,
                            "name": "_tokens",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1552,
                            "src": "7150:7:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                              "typeString": "address[] memory"
                            }
                          },
                          "id": 1574,
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
                            "id": 1575,
                            "name": "_quantities",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1555,
                            "src": "7168:11:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                              "typeString": "uint256[] memory"
                            }
                          },
                          "id": 1576,
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
                      "id": 1572,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        7073,
                        7074
                      ],
                      "referencedDeclaration": 7073,
                      "src": "7142:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 1578,
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
                  "id": 1579,
                  "nodeType": "ExpressionStatement",
                  "src": "7142:45:5"
                },
                {
                  "body": {
                    "id": 1602,
                    "nodeType": "Block",
                    "src": "7317:158:5",
                    "statements": [
                      {
                        "expression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 1592,
                              "name": "_from",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1547,
                              "src": "7364:5:5",
                              "typeDescriptions": {
                                "typeIdentifier": "t_address",
                                "typeString": "address"
                              }
                            },
                            {
                              "argumentTypes": null,
                              "id": 1593,
                              "name": "_to",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 1549,
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
                                "id": 1594,
                                "name": "_tokens",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1552,
                                "src": "7408:7:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                                  "typeString": "address[] memory"
                                }
                              },
                              "id": 1596,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1595,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1581,
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
                                "id": 1597,
                                "name": "_quantities",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1555,
                                "src": "7436:11:5",
                                "typeDescriptions": {
                                  "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                                  "typeString": "uint256[] memory"
                                }
                              },
                              "id": 1599,
                              "indexExpression": {
                                "argumentTypes": null,
                                "id": 1598,
                                "name": "i",
                                "nodeType": "Identifier",
                                "overloadedDeclarations": [],
                                "referencedDeclaration": 1581,
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
                            "id": 1591,
                            "name": "depositInternal",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 1512,
                            "src": "7331:15:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                              "typeString": "function (address,address,address,uint256)"
                            }
                          },
                          "id": 1600,
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
                        "id": 1601,
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
                    "id": 1587,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftExpression": {
                      "argumentTypes": null,
                      "id": 1584,
                      "name": "i",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1581,
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
                        "id": 1585,
                        "name": "_tokens",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1552,
                        "src": "7296:7:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                          "typeString": "address[] memory"
                        }
                      },
                      "id": 1586,
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
                  "id": 1603,
                  "initializationExpression": {
                    "assignments": [
                      1581
                    ],
                    "declarations": [
                      {
                        "constant": false,
                        "id": 1581,
                        "name": "i",
                        "nodeType": "VariableDeclaration",
                        "scope": 1605,
                        "src": "7277:9:5",
                        "stateVariable": false,
                        "storageLocation": "default",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "typeName": {
                          "id": 1580,
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
                    "id": 1583,
                    "initialValue": {
                      "argumentTypes": null,
                      "hexValue": "30",
                      "id": 1582,
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
                      "id": 1589,
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
                        "id": 1588,
                        "name": "i",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 1581,
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
                    "id": 1590,
                    "nodeType": "ExpressionStatement",
                    "src": "7312:3:5"
                  },
                  "nodeType": "ForStatement",
                  "src": "7272:203:5"
                }
              ]
            },
            "documentation": "Deposit multiple tokens to the vault. Quantities should be in the\norder of the addresses of the tokens being deposited.\n     * @param  _from            Address depositing tokens\n@param  _to              Address to credit for deposits\n@param  _tokens          Addresses of tokens being deposited\n@param  _quantities      The quantities of tokens to deposit",
            "id": 1605,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "batchDepositInternal",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1556,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 1547,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6750:13:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1546,
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
                  "id": 1549,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6773:11:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 1548,
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
                  "id": 1552,
                  "name": "_tokens",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6794:17:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_address_$dyn_memory_ptr",
                    "typeString": "address[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1550,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "6794:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 1551,
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
                  "id": 1555,
                  "name": "_quantities",
                  "nodeType": "VariableDeclaration",
                  "scope": 1605,
                  "src": "6821:21:5",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_array$_t_uint256_$dyn_memory_ptr",
                    "typeString": "uint256[]"
                  },
                  "typeName": {
                    "baseType": {
                      "id": 1553,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "6821:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "id": 1554,
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
              "id": 1557,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "6870:0:5"
            },
            "scope": 1606,
            "src": "6711:770:5",
            "stateMutability": "nonpayable",
            "superFunction": 3454,
            "visibility": "internal"
          }
        ],
        "scope": 1607,
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
  "updatedAt": "2018-08-25T17:34:39.484Z"
}