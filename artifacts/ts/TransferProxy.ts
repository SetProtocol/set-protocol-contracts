export const TransferProxy = 
{
  "contractName": "TransferProxy",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "addAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authorities",
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
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        }
      ],
      "name": "removeAuthorizedAddress",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
      "constant": false,
      "inputs": [
        {
          "name": "_authTarget",
          "type": "address"
        },
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "removeAuthorizedAddressAtIndex",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorized",
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
      "inputs": [],
      "name": "getAuthorizedAddresses",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "authAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AddressAuthorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "addressRemoved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "authorizedBy",
          "type": "address"
        }
      ],
      "name": "AuthorizedAddressRemoved",
      "type": "event"
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
          "name": "_tokenAddress",
          "type": "address"
        },
        {
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260008054600160a060020a031916331790556111e3806100256000396000f3006080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100d85780637071293914610119578063715018a6146101475780638da5cb5b1461015c5780639ad2674414610171578063a6c4e467146101a2578063b9181611146101e0578063d39de6e914610222578063f2fde38b14610287575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff600435166102b5565b005b3480156100e457600080fd5b506100f06004356104e3565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561012557600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610518565b34801561015357600080fd5b506100d6610815565b34801561016857600080fd5b506100f06108a6565b34801561017d57600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff600435166024356108c2565b3480156101ae57600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004358116906024359060443581169060643516610c3d565b3480156101ec57600080fd5b5061020e73ffffffffffffffffffffffffffffffffffffffff60043516610d62565b604080519115158252519081900360200190f35b34801561022e57600080fd5b50610237610d77565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561027357818101518382015260200161025b565b505050509050019250505060405180910390f35b34801561029357600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610de7565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102d957600080fd5b73ffffffffffffffffffffffffffffffffffffffff8116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff1615610406576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103cb5781810151838201526020016103b3565b50505050905090810190601f1680156103f85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8116600081815260016020818152604080842080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106104f157fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b6000805473ffffffffffffffffffffffffffffffffffffffff16331461053d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff16151561062f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b505073ffffffffffffffffffffffffffffffffffffffff8116600090815260016020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690555b600254811015610811578173ffffffffffffffffffffffffffffffffffffffff166002828154811015156106ad57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16141561080957600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff810190811061070557fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff909216918390811061073857fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107b79082611174565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610811565b60010161067d565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461083957600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108e657600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106109ae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b508173ffffffffffffffffffffffffffffffffffffffff166002828154811015156109d557fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e0000000000000000000000000000000000000090830152909173ffffffffffffffffffffffffffffffffffffffff90911614610abe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b5073ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610b3a57fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff9092169183908110610b6d57fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190610bec9082611174565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b336000908152600160209081526040808320548151606081018352602a81527f53656e646572206e6f7420617574686f72697a656420746f2063616c6c207468938101939093527f6973206d6574686f642e000000000000000000000000000000000000000000009183019190915282919060ff161515610d1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b50610d258684610e17565b9150610d3386858588610ee7565b610d3d8684610e17565b9050610d4f828663ffffffff61107a16565b8114610d5a57600080fd5b505050505050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610ddc57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610db1575b505050505090505b90565b60005473ffffffffffffffffffffffffffffffffffffffff163314610e0b57600080fd5b610e148161108d565b50565b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015610eb457600080fd5b505af1158015610ec8573d6000803e3d6000fd5b505050506040513d6020811015610ede57600080fd5b50519392505050565b604080517f23b872dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b158015610f6757600080fd5b505af1158015610f7b573d6000803e3d6000fd5b50505050610f8761113c565b608060405190810160405280604a81526020017f5472616e7366657272656420746f6b656e20646f6573206e6f7420726574757281526020017f6e206e756c6c206f722074727565206f6e207375636365737366756c2074726181526020017f6e7366657246726f6d2e00000000000000000000000000000000000000000000815250901515611073576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b5050505050565b8181018281101561108757fe5b92915050565b73ffffffffffffffffffffffffffffffffffffffff811615156110af57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000803d8015611153576020811461115c57611168565b60019150611168565b60206000803e60005191505b508060011491505b5090565b8154818355818111156111985760008381526020902061119891810190830161119d565b505050565b610de491905b8082111561117057600081556001016111a35600a165627a7a7230582091691d057a08c96576d0a40f4561fdb146973081db1754ee0c13b9524ef003e30029",
  "deployedBytecode": "0x6080604052600436106100a35763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166342f1181e81146100a8578063494503d4146100d85780637071293914610119578063715018a6146101475780638da5cb5b1461015c5780639ad2674414610171578063a6c4e467146101a2578063b9181611146101e0578063d39de6e914610222578063f2fde38b14610287575b600080fd5b3480156100b457600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff600435166102b5565b005b3480156100e457600080fd5b506100f06004356104e3565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561012557600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610518565b34801561015357600080fd5b506100d6610815565b34801561016857600080fd5b506100f06108a6565b34801561017d57600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff600435166024356108c2565b3480156101ae57600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff6004358116906024359060443581169060643516610c3d565b3480156101ec57600080fd5b5061020e73ffffffffffffffffffffffffffffffffffffffff60043516610d62565b604080519115158252519081900360200190f35b34801561022e57600080fd5b50610237610d77565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561027357818101518382015260200161025b565b505050509050019250505060405180910390f35b34801561029357600080fd5b506100d673ffffffffffffffffffffffffffffffffffffffff60043516610de7565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102d957600080fd5b73ffffffffffffffffffffffffffffffffffffffff8116600090815260016020908152604091829020548251606081018452602681527f546172676574206d757374206e6f7420616c726561647920626520617574686f928101929092527f72697a65642e0000000000000000000000000000000000000000000000000000928201929092529060ff1615610406576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b838110156103cb5781810151838201526020016103b3565b50505050905090810190601f1680156103f85780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff8116600081815260016020818152604080842080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016841790556002805493840181559093527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace90910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001684179055815133815291517f8918da6429714f0e9c40ae7f270773e27fc8caf7a256e19807f859563b7514de9281900390910190a250565b60028054829081106104f157fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b6000805473ffffffffffffffffffffffffffffffffffffffff16331461053d57600080fd5b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604091829020548251606081018452602281527f5461726765742061646472657373206d75737420626520617574686f72697a65928101929092527f642e000000000000000000000000000000000000000000000000000000000000928201929092529060ff16151561062f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b505073ffffffffffffffffffffffffffffffffffffffff8116600090815260016020526040812080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690555b600254811015610811578173ffffffffffffffffffffffffffffffffffffffff166002828154811015156106ad57fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16141561080957600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff810190811061070557fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff909216918390811061073857fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01906107b79082611174565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a2610811565b60010161067d565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461083957600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116917ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482091a2600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108e657600080fd5b60025460408051606081018252602781527f53706563696669656420617272617920696e646578206973206f7574206f662060208201527f626f756e64732e00000000000000000000000000000000000000000000000000918101919091529082106109ae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b508173ffffffffffffffffffffffffffffffffffffffff166002828154811015156109d557fe5b6000918252602091829020015460408051606081018252602d81527f4164647265737320666f756e6420617420696e64657820646f6573206e6f7420938101939093527f6d61746368207461726765742e0000000000000000000000000000000000000090830152909173ffffffffffffffffffffffffffffffffffffffff90911614610abe576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b5073ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101908110610b3a57fe5b6000918252602090912001546002805473ffffffffffffffffffffffffffffffffffffffff9092169183908110610b6d57fe5b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055600280547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190610bec9082611174565b5060408051338152905173ffffffffffffffffffffffffffffffffffffffff8416917f1f32c1b084e2de0713b8fb16bd46bb9df710a3dbeae2f3ca93af46e016dcc6b0919081900360200190a25050565b336000908152600160209081526040808320548151606081018352602a81527f53656e646572206e6f7420617574686f72697a656420746f2063616c6c207468938101939093527f6973206d6574686f642e000000000000000000000000000000000000000000009183019190915282919060ff161515610d1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b50610d258684610e17565b9150610d3386858588610ee7565b610d3d8684610e17565b9050610d4f828663ffffffff61107a16565b8114610d5a57600080fd5b505050505050565b60016020526000908152604090205460ff1681565b60606002805480602002602001604051908101604052809291908181526020018280548015610ddc57602002820191906000526020600020905b815473ffffffffffffffffffffffffffffffffffffffff168152600190910190602001808311610db1575b505050505090505b90565b60005473ffffffffffffffffffffffffffffffffffffffff163314610e0b57600080fd5b610e148161108d565b50565b60008273ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b158015610eb457600080fd5b505af1158015610ec8573d6000803e3d6000fd5b505050506040513d6020811015610ede57600080fd5b50519392505050565b604080517f23b872dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528481166024830152604482018490529151918616916323b872dd9160648082019260009290919082900301818387803b158015610f6757600080fd5b505af1158015610f7b573d6000803e3d6000fd5b50505050610f8761113c565b608060405190810160405280604a81526020017f5472616e7366657272656420746f6b656e20646f6573206e6f7420726574757281526020017f6e206e756c6c206f722074727565206f6e207375636365737366756c2074726181526020017f6e7366657246726f6d2e00000000000000000000000000000000000000000000815250901515611073576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382528381815181526020019150805190602001908083836000838110156103cb5781810151838201526020016103b3565b5050505050565b8181018281101561108757fe5b92915050565b73ffffffffffffffffffffffffffffffffffffffff811615156110af57600080fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000803d8015611153576020811461115c57611168565b60019150611168565b60206000803e60005191505b508060011491505b5090565b8154818355818111156111985760008381526020902061119891810190830161119d565b505050565b610de491905b8082111561117057600081556001016111a35600a165627a7a7230582091691d057a08c96576d0a40f4561fdb146973081db1754ee0c13b9524ef003e30029",
  "sourceMap": "992:1434:4:-;;;567:5:61;:18;;-1:-1:-1;;;;;;567:18:61;575:10;567:18;;;992:1434:4;;;;;;",
  "deployedSourceMap": "992:1434:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2599:558:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;2599:558:45;;;;;;;;;1721:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1721:28:45;;;;;;;;;;;;;;;;;;;;;;;;3324:980;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;3324:980:45;;;;;;;827:111:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;827:111:61;;;;238:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:61;;;;4571:939:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;4571:939:45;;;;;;;;;1584:840:4;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1584:840:4;;;;;;;;;;;;;;;;;;;;1634:43:45;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1634:43:45;;;;;;;;;;;;;;;;;;;;;;;;;5620:186;;8:9:-1;5:2;;;30:1;27;20:12;5:2;5620:186:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;5620:186:45;;;;;;;;;;;;;;;;;1100:103:61;;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1100:103:61;;;;;;;2599:558:45;719:5:61;;;;705:10;:19;697:28;;;;;;2779:23:45;;;;;;;:10;:23;;;;;;;;;;2816:25;;;;;;;;;;;;;;;;;;;;;;;;;;;2779:23;;2778:24;2757:94;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;2757:94:45;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;2903:23:45;;;;;;;2929:4;2903:23;;;;;;;;:30;;;;;;;;2988:11;27:10:-1;;23:18;;;45:23;;2988:29:45;;;;;;;;;;;;;;;3074:76;;3130:10;3074:76;;;;;;;;;;;;;;2599:558;:::o;1721:28::-;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;1721:28:45;:::o;3324:980::-;3664:6;719:5:61;;;;705:10;:19;697:28;;;;;;3489:23:45;;;;;;;:10;:23;;;;;;;;;;3526:21;;;;;;;;;;;;;;;;;;;;;;;;;;;3489:23;;3468:89;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;3468:89:45;-1:-1:-1;;3625:23:45;;;;;;;:10;:23;;;;;3618:30;;;;;;3659:639;3680:11;:18;3676:22;;3659:639;;;3812:11;3794:29;;:11;3806:1;3794:14;;;;;;;;;;;;;;;;;;;;;;:29;3790:498;;;3938:11;3950:18;;:22;;;;3938:35;;;;;;;;;;;;;;;;3921:11;:14;;3938:35;;;;;3933:1;;3921:14;;;;;;;;;;;;;;;:52;;;;;;;;;;;;;;;4040:11;:23;;;;;;;;;:::i;:::-;-1:-1:-1;4143:107:45;;;4222:10;4143:107;;;;;;;;;;;;;;;;;;4268:5;;3790:498;3700:3;;3659:639;;;3324:980;;:::o;827:111:61:-;719:5;;;;705:10;:19;697:28;;;;;;903:5;;;884:25;;903:5;;;;;884:25;;;931:1;915:18;;;;;;827:111::o;238:20::-;;;;;;:::o;4571:939:45:-;719:5:61;;;;705:10;:19;697:28;;;;;;4809:11:45;:18;4841:19;;;;;;;;;;;;;;;;;;;;;;;;;4800:27;;4779:91;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4779:91:45;;4999:11;4976:34;;:11;4988:6;4976:19;;;;;;;;;;;;;;;;;;;;;5024:22;;;;;;;;;;;;;;;;;;;;;;;;;;4976:19;;;;:34;4955:101;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;4955:101:45;-1:-1:-1;5124:23:45;;;;;;;:10;:23;;;;;5117:30;;;;;;5245:11;5257:18;;:22;;;;5245:35;;;;;;;;;;;;;;;;5223:11;:19;;5245:35;;;;;5235:6;;5223:19;;;;;;;;;;;;;;;:57;;;;;;;;;;;;;;;5333:11;:23;;;;;;;;;:::i;:::-;-1:-1:-1;5420:83:45;;;5483:10;5420:83;;;;;;;;;;;;;;;;;;4571:939;;:::o;1584:840:4:-;1943:10:45;1823:20:4;1932:22:45;;;:10;:22;;;;;;;;;1968:21;;;;;;;;;;;;;;;;;;;;;;;;;;1823:20:4;;1968:21:45;1932:22;;1911:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;1911:88:45;;1846:76:4;1882:13;1909:3;1846:22;:76::i;:::-;1823:99;;2006:121;2045:13;2072:5;2091:3;2108:9;2006:25;:121::i;:::-;2217:76;2253:13;2280:3;2217:22;:76::i;:::-;2199:94;-1:-1:-1;2386:30:4;:15;2406:9;2386:30;:19;:30;:::i;:::-;2372:44;;2364:53;;;;;;1584:840;;;;;;:::o;1634:43:45:-;;;;;;;;;;;;;;;:::o;5620:186::-;5701:9;5788:11;5781:18;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5620:186;;:::o;1100:103:61:-;719:5;;;;705:10;:19;697:28;;;;;;1169:29;1188:9;1169:18;:29::i;:::-;1100:103;:::o;1497:217:47:-;1631:7;1668:13;1661:31;;;1693:13;1661:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1661:46:47;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;1661:46:47;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1661:46:47;;1497:217;-1:-1:-1;;;1497:217:47:o;2261:322::-;2422:57;;;;;;:34;:57;;;;;;;;;;;;;;;;;;;;;;:34;;;;;;:57;;;;;-1:-1:-1;;2422:57:47;;;;;;;;-1:-1:-1;2422:34:47;:57;;;5:2:-1;;;;30:1;27;20:12;5:2;2422:57:47;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;2422:57:47;;;;2511:14;:12;:14::i;:::-;2539:27;;;;;;;;;;;;;;;;;;;;;;;;;;;;2490:86;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;2490:86:47;;2261:322;;;;:::o;1214:123:60:-;1293:5;;;1311:6;;;;1304:14;;;;1214:123;;;;:::o;1338:171:61:-;1408:23;;;;;1400:32;;;;;;1464:5;;;1443:38;;;;;;;1464:5;;;1443:38;;;1487:5;:17;;;;;;;;;;;;;;;1338:171::o;3094:852:47:-;3169:4;;3353:14;3430:57;;;;3539:4;3534:220;;;;3346:497;;3430:57;3472:1;3457:16;;3430:57;;3534:220;3639:4;3634:3;3629;3614:30;3736:3;3730:10;3715:25;;3346:497;;3923:11;3938:1;3923:16;3916:23;;3094:852;;;:::o;992:1434:4:-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;:::o;:::-;;;;;;;;;;;;;;;;;",
  "source": "/*\n    Copyright 2018 Set Labs Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n*/\n\npragma solidity 0.4.24;\n\n\nimport { Authorizable } from \"../lib/Authorizable.sol\";\nimport { SafeMath } from \"zeppelin-solidity/contracts/math/SafeMath.sol\";\nimport { ERC20Wrapper } from \"../lib/ERC20Wrapper.sol\";\n\n\n/**\n * @title TransferProxy\n * @author Set Protocol\n *\n * The proxy contract is responsible for updating token balances to assist with issuance\n * and filling issuance orders.\n */\n\ncontract TransferProxy is\n    Authorizable\n{\n    using SafeMath for uint256;\n\n    /* ============ No Constructor ============ */\n\n    /* ============ External Functions ============ */\n\n    /**\n     * Transfers tokens from an address (that has set allowance on the proxy).\n     * Can only be called by authorized core contracts.\n     *\n     * @param  _tokenAddress   The address of the ERC20 token\n     * @param  _quantity       The number of tokens to transfer\n     * @param  _from           The address to transfer from\n     * @param  _to             The address to transfer to\n     */\n    function transfer(\n        address _tokenAddress,\n        uint _quantity,\n        address _from,\n        address _to\n    )\n        external\n        onlyAuthorized\n    {\n        // Retrieve current balance of token for the receiver\n        uint existingBalance = ERC20Wrapper.balanceOf(\n            _tokenAddress,\n            _to\n        );\n\n        // Call specified ERC20 contract to transfer tokens (via proxy).\n        ERC20Wrapper.transferFrom(\n            _tokenAddress,\n            _from,\n            _to,\n            _quantity\n        );\n\n        // Get new balance of transferred token for receiver\n        uint newBalance = ERC20Wrapper.balanceOf(\n            _tokenAddress,\n            _to\n        );\n\n        // Verify transfer quantity is reflected in balance\n        require(newBalance == existingBalance.add(_quantity));\n    }\n}\n",
  "sourcePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/TransferProxy.sol",
  "ast": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        718
      ]
    },
    "id": 719,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 658,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 660,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 4706,
        "src": "623:55:4",
        "symbolAliases": [
          {
            "foreign": 659,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 662,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 6347,
        "src": "679:73:4",
        "symbolAliases": [
          {
            "foreign": 661,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 664,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 4866,
        "src": "753:55:4",
        "symbolAliases": [
          {
            "foreign": 663,
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
              "id": 665,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4705,
              "src": "1022:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$4705",
                "typeString": "contract Authorizable"
              }
            },
            "id": 666,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:12:4"
          }
        ],
        "contractDependencies": [
          4705,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The proxy contract is responsible for updating token balances to assist with issuance\nand filling issuance orders.",
        "fullyImplemented": true,
        "id": 718,
        "linearizedBaseContracts": [
          718,
          4705,
          6432
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 669,
            "libraryName": {
              "contractScope": null,
              "id": 667,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1047:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1041:27:4",
            "typeName": {
              "id": 668,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1060:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 716,
              "nodeType": "Block",
              "src": "1751:673:4",
              "statements": [
                {
                  "assignments": [
                    683
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 683,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 717,
                      "src": "1823:20:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 682,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1823:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 689,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 686,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "1882:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 687,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "1909:3:4",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 684,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "1846:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 685,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4754,
                      "src": "1846:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 688,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1846:76:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1823:99:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 693,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "2045:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 694,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 675,
                        "src": "2072:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 695,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "2091:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 696,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 673,
                        "src": "2108:9:4",
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
                        "id": 690,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "2006:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 692,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4825,
                      "src": "2006:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 697,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2006:121:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 698,
                  "nodeType": "ExpressionStatement",
                  "src": "2006:121:4"
                },
                {
                  "assignments": [
                    700
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 700,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 717,
                      "src": "2199:15:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 699,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "2199:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 706,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 703,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "2253:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 704,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "2280:3:4",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 701,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "2217:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 702,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4754,
                      "src": "2217:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 705,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2217:76:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2199:94:4"
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
                        "id": 713,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 708,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 700,
                          "src": "2372:10:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 711,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 673,
                              "src": "2406:9:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 709,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 683,
                              "src": "2386:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 710,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6345,
                            "src": "2386:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 712,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2386:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2372:44:4",
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
                      "id": 707,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "2364:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 714,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2364:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 715,
                  "nodeType": "ExpressionStatement",
                  "src": "2364:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 717,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 680,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 679,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4530,
                  "src": "1732:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1732:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 678,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 671,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1611:21:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 670,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1611:7:4",
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
                  "id": 673,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1642:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 672,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1642:4:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 675,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1666:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 674,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1666:7:4",
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
                  "id": 677,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1689:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 676,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1689:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1601:105:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1751:0:4"
            },
            "scope": 718,
            "src": "1584:840:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 719,
        "src": "992:1434:4"
      }
    ],
    "src": "597:1830:4"
  },
  "legacyAST": {
    "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/core/TransferProxy.sol",
    "exportedSymbols": {
      "TransferProxy": [
        718
      ]
    },
    "id": 719,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 658,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "597:23:4"
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/Authorizable.sol",
        "file": "../lib/Authorizable.sol",
        "id": 660,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 4706,
        "src": "623:55:4",
        "symbolAliases": [
          {
            "foreign": 659,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "file": "zeppelin-solidity/contracts/math/SafeMath.sol",
        "id": 662,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 6347,
        "src": "679:73:4",
        "symbolAliases": [
          {
            "foreign": 661,
            "local": null
          }
        ],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/inje/Documents/repos/set-protocol-contracts/contracts/lib/ERC20Wrapper.sol",
        "file": "../lib/ERC20Wrapper.sol",
        "id": 664,
        "nodeType": "ImportDirective",
        "scope": 719,
        "sourceUnit": 4866,
        "src": "753:55:4",
        "symbolAliases": [
          {
            "foreign": 663,
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
              "id": 665,
              "name": "Authorizable",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 4705,
              "src": "1022:12:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_Authorizable_$4705",
                "typeString": "contract Authorizable"
              }
            },
            "id": 666,
            "nodeType": "InheritanceSpecifier",
            "src": "1022:12:4"
          }
        ],
        "contractDependencies": [
          4705,
          6432
        ],
        "contractKind": "contract",
        "documentation": "@title TransferProxy\n@author Set Protocol\n * The proxy contract is responsible for updating token balances to assist with issuance\nand filling issuance orders.",
        "fullyImplemented": true,
        "id": 718,
        "linearizedBaseContracts": [
          718,
          4705,
          6432
        ],
        "name": "TransferProxy",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 669,
            "libraryName": {
              "contractScope": null,
              "id": 667,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 6346,
              "src": "1047:8:4",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$6346",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "1041:27:4",
            "typeName": {
              "id": 668,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "1060:7:4",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "body": {
              "id": 716,
              "nodeType": "Block",
              "src": "1751:673:4",
              "statements": [
                {
                  "assignments": [
                    683
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 683,
                      "name": "existingBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 717,
                      "src": "1823:20:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 682,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "1823:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 689,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 686,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "1882:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 687,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "1909:3:4",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 684,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "1846:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 685,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4754,
                      "src": "1846:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 688,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "1846:76:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "1823:99:4"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 693,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "2045:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 694,
                        "name": "_from",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 675,
                        "src": "2072:5:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 695,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "2091:3:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 696,
                        "name": "_quantity",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 673,
                        "src": "2108:9:4",
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
                        "id": 690,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "2006:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 692,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transferFrom",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4825,
                      "src": "2006:25:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_address_$_t_uint256_$returns$__$",
                        "typeString": "function (address,address,address,uint256)"
                      }
                    },
                    "id": 697,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2006:121:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 698,
                  "nodeType": "ExpressionStatement",
                  "src": "2006:121:4"
                },
                {
                  "assignments": [
                    700
                  ],
                  "declarations": [
                    {
                      "constant": false,
                      "id": 700,
                      "name": "newBalance",
                      "nodeType": "VariableDeclaration",
                      "scope": 717,
                      "src": "2199:15:4",
                      "stateVariable": false,
                      "storageLocation": "default",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      },
                      "typeName": {
                        "id": 699,
                        "name": "uint",
                        "nodeType": "ElementaryTypeName",
                        "src": "2199:4:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "value": null,
                      "visibility": "internal"
                    }
                  ],
                  "id": 706,
                  "initialValue": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 703,
                        "name": "_tokenAddress",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 671,
                        "src": "2253:13:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      {
                        "argumentTypes": null,
                        "id": 704,
                        "name": "_to",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 677,
                        "src": "2280:3:4",
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
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      ],
                      "expression": {
                        "argumentTypes": null,
                        "id": 701,
                        "name": "ERC20Wrapper",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 4865,
                        "src": "2217:12:4",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_contract$_ERC20Wrapper_$4865_$",
                          "typeString": "type(library ERC20Wrapper)"
                        }
                      },
                      "id": 702,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "balanceOf",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 4754,
                      "src": "2217:22:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_view$_t_address_$_t_address_$returns$_t_uint256_$",
                        "typeString": "function (address,address) view returns (uint256)"
                      }
                    },
                    "id": 705,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2217:76:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "nodeType": "VariableDeclarationStatement",
                  "src": "2199:94:4"
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
                        "id": 713,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "id": 708,
                          "name": "newBalance",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 700,
                          "src": "2372:10:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "==",
                        "rightExpression": {
                          "argumentTypes": null,
                          "arguments": [
                            {
                              "argumentTypes": null,
                              "id": 711,
                              "name": "_quantity",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 673,
                              "src": "2406:9:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            }
                          ],
                          "expression": {
                            "argumentTypes": [
                              {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            ],
                            "expression": {
                              "argumentTypes": null,
                              "id": 709,
                              "name": "existingBalance",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 683,
                              "src": "2386:15:4",
                              "typeDescriptions": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              }
                            },
                            "id": 710,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "add",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": 6345,
                            "src": "2386:19:4",
                            "typeDescriptions": {
                              "typeIdentifier": "t_function_internal_pure$_t_uint256_$_t_uint256_$returns$_t_uint256_$bound_to$_t_uint256_$",
                              "typeString": "function (uint256,uint256) pure returns (uint256)"
                            }
                          },
                          "id": 712,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "kind": "functionCall",
                          "lValueRequested": false,
                          "names": [],
                          "nodeType": "FunctionCall",
                          "src": "2386:30:4",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "src": "2372:44:4",
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
                      "id": 707,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        6902,
                        6903
                      ],
                      "referencedDeclaration": 6902,
                      "src": "2364:7:4",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 714,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "2364:53:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 715,
                  "nodeType": "ExpressionStatement",
                  "src": "2364:53:4"
                }
              ]
            },
            "documentation": "Transfers tokens from an address (that has set allowance on the proxy).\nCan only be called by authorized core contracts.\n     * @param  _tokenAddress   The address of the ERC20 token\n@param  _quantity       The number of tokens to transfer\n@param  _from           The address to transfer from\n@param  _to             The address to transfer to",
            "id": 717,
            "implemented": true,
            "isConstructor": false,
            "isDeclaredConst": false,
            "modifiers": [
              {
                "arguments": null,
                "id": 680,
                "modifierName": {
                  "argumentTypes": null,
                  "id": 679,
                  "name": "onlyAuthorized",
                  "nodeType": "Identifier",
                  "overloadedDeclarations": [],
                  "referencedDeclaration": 4530,
                  "src": "1732:14:4",
                  "typeDescriptions": {
                    "typeIdentifier": "t_modifier$__$",
                    "typeString": "modifier ()"
                  }
                },
                "nodeType": "ModifierInvocation",
                "src": "1732:14:4"
              }
            ],
            "name": "transfer",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 678,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 671,
                  "name": "_tokenAddress",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1611:21:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 670,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1611:7:4",
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
                  "id": 673,
                  "name": "_quantity",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1642:14:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 672,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "1642:4:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                },
                {
                  "constant": false,
                  "id": 675,
                  "name": "_from",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1666:13:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 674,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1666:7:4",
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
                  "id": 677,
                  "name": "_to",
                  "nodeType": "VariableDeclaration",
                  "scope": 717,
                  "src": "1689:11:4",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address",
                    "typeString": "address"
                  },
                  "typeName": {
                    "id": 676,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "1689:7:4",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "1601:105:4"
            },
            "payable": false,
            "returnParameters": {
              "id": 681,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "1751:0:4"
            },
            "scope": 718,
            "src": "1584:840:4",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "external"
          }
        ],
        "scope": 719,
        "src": "992:1434:4"
      }
    ],
    "src": "597:1830:4"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "2.0.0",
  "updatedAt": "2018-07-13T21:55:38.164Z"
}